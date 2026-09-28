/* eslint-disable no-console */
import 'dotenv/config';
import mongoose from 'mongoose';
import * as bcrypt from "bcryptjs";
import { UserSchema, User } from '../modules/users/schemas/user.schema';
import { UserRole, ProgramStatus, CommissionType, ApplicationStatus, CommissionStatus, PayoutStatus } from '@smartfinds/types';

// Import remaining schemas directly rather than bootstrapping the whole Nest
// app — a seed script only needs the models, not controllers/guards/etc.
import { AdvertiserSchema, Advertiser } from '../modules/advertisers/schemas/advertiser.schema';
import { PublisherSchema, Publisher } from '../modules/publishers/schemas/publisher.schema';
import { AffiliateProgramSchema, AffiliateProgram } from '../modules/affiliate-programs/schemas/affiliate-program.schema';
import { AffiliateApplicationSchema, AffiliateApplication } from '../modules/applications/schemas/affiliate-application.schema';
import { TrackingLinkSchema, TrackingLink } from '../modules/tracking-links/schemas/tracking-link.schema';
import { ClickSchema, Click } from '../modules/clicks/schemas/click.schema';
import { ConversionSchema, Conversion } from '../modules/conversions/schemas/conversion.schema';
import { CommissionSchema, Commission } from '../modules/commissions/schemas/commission.schema';
import { PayoutSchema, Payout } from '../modules/payouts/schemas/payout.schema';

const FICTIONAL_BRANDS = [
  'Northloom Home', 'Cedarline Outdoors', 'Verdant Skincare', 'Fablewear',
  'Basecamp Nutrition', 'Glassrock Audio', 'Millpond Coffee', 'Solace Sleep',
  'Kindlewick Candles', 'Rivergate Travel', 'Ashfield Tools', 'Marrow Fitness',
  'Pinehall Books', 'Copperline Bikes', 'Wrenfield Pet Co.',
];

const CATEGORIES = ['Home & Living', 'Outdoors', 'Beauty', 'Fashion', 'Health', 'Electronics', 'Travel', 'Fitness'];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function seed() {
  const uri = process.env.DATABASE_URL ?? 'mongodb://localhost:27017/smartfinds';
  await mongoose.connect(uri);
  console.log(`Connected to ${uri}`);

  const UserModel = mongoose.model(User.name, UserSchema);
  const AdvertiserModel = mongoose.model(Advertiser.name, AdvertiserSchema);
  const PublisherModel = mongoose.model(Publisher.name, PublisherSchema);
  const ProgramModel = mongoose.model(AffiliateProgram.name, AffiliateProgramSchema);
  const ApplicationModel = mongoose.model(AffiliateApplication.name, AffiliateApplicationSchema);
  const TrackingLinkModel = mongoose.model(TrackingLink.name, TrackingLinkSchema);
  const ClickModel = mongoose.model(Click.name, ClickSchema);
  const ConversionModel = mongoose.model(Conversion.name, ConversionSchema);
  const CommissionModel = mongoose.model(Commission.name, CommissionSchema);
  const PayoutModel = mongoose.model(Payout.name, PayoutSchema);

  console.log('Clearing existing collections...');
  await Promise.all([
    UserModel.deleteMany({}), AdvertiserModel.deleteMany({}), PublisherModel.deleteMany({}),
    ProgramModel.deleteMany({}), ApplicationModel.deleteMany({}), TrackingLinkModel.deleteMany({}),
    ClickModel.deleteMany({}), ConversionModel.deleteMany({}), CommissionModel.deleteMany({}),
    PayoutModel.deleteMany({}),
  ]);

  const passwordHash = await bcrypt.hash('Password123!', 12);

  console.log('Seeding admin...');
  await UserModel.create({
    email: 'admin@smartfinds.dev', passwordHash, name: 'Ada Morrow',
    role: UserRole.ADMIN, isEmailVerified: true,
  });

  console.log('Seeding 5 advertisers...');
  const advertisers = [];
  for (let i = 0; i < 5; i++) {
    const brand = FICTIONAL_BRANDS[i];
    const user = await UserModel.create({
      email: `advertiser${i + 1}@smartfinds.dev`, passwordHash, name: `${brand} Team`,
      role: UserRole.ADVERTISER, isEmailVerified: true,
    });
    const advertiser = await AdvertiserModel.create({
      userId: user._id, companyName: brand,
      website: `https://${slugify(brand)}.example.com`,
      industry: pick(CATEGORIES), isVerified: true,
    });
    advertisers.push(advertiser);
  }

  console.log('Seeding 20 publishers...');
  const publishers = [];
  for (let i = 0; i < 20; i++) {
    const user = await UserModel.create({
      email: `publisher${i + 1}@smartfinds.dev`, passwordHash, name: `Publisher ${i + 1}`,
      role: UserRole.PUBLISHER, isEmailVerified: true,
    });
    const publisher = await PublisherModel.create({
      userId: user._id, website: `https://creator${i + 1}.example.com`,
      niche: pick(CATEGORIES), audienceSize: randInt(1000, 500000), isVerified: true,
    });
    publishers.push(publisher);
  }

  console.log('Seeding 15 affiliate programs...');
  const programs = [];
  for (let i = 0; i < 15; i++) {
    const advertiser = pick(advertisers);
    const commissionType = i % 3 === 0 ? CommissionType.FIXED : CommissionType.PERCENTAGE;
    const program = await ProgramModel.create({
      advertiserId: advertiser._id,
      name: `${advertiser.companyName} Affiliate Program`,
      description: `Earn commission promoting ${advertiser.companyName} to your audience.`,
      category: pick(CATEGORIES),
      website: advertiser.website,
      commissionType,
      commissionRate: commissionType === CommissionType.FIXED ? randInt(5, 25) : randInt(4, 20),
      cookieDurationDays: pick([7, 14, 30, 45, 60]),
      status: ProgramStatus.ACTIVE,
      terms: 'Standard commission terms apply. No self-referrals or coupon-only sites.',
    });
    programs.push(program);
  }

  console.log('Seeding applications, tracking links, clicks, conversions, commissions, payouts...');
  const trackingLinks = [];
  for (const publisher of publishers) {
    const joinedPrograms = [...programs].sort(() => 0.5 - Math.random()).slice(0, randInt(1, 4));
    for (const program of joinedPrograms) {
      await ApplicationModel.create({
        publisherId: publisher._id, programId: program._id,
        status: ApplicationStatus.APPROVED, reviewedAt: new Date(),
      });
      const link = await TrackingLinkModel.create({
        publisherId: publisher._id, programId: program._id,
        slug: `${slugify(String(publisher._id)).slice(0, 6)}-${slugify(String(program._id)).slice(0, 6)}`,
        destinationUrl: program.website,
      });
      trackingLinks.push(link);
    }
  }

  let clickCount = 0;
  let conversionCount = 0;
  for (const link of trackingLinks) {
    const clicks = randInt(5, 25);
    for (let c = 0; c < clicks; c++) {
      const click = await ClickModel.create({
        trackingLinkId: link._id, publisherId: link.publisherId, programId: link.programId,
        ipHash: `hash_${randInt(100000, 999999)}`, userAgent: 'Mozilla/5.0', country: pick(['US', 'GB', 'CA', 'AU', 'DE']),
      });
      clickCount++;

      if (Math.random() < 0.15) {
        const program = programs.find((p) => String(p._id) === String(link.programId));
        const orderValue = randInt(20, 400);
        const conversion = await ConversionModel.create({
          clickId: click._id, trackingLinkId: link._id, publisherId: link.publisherId,
          programId: link.programId, orderValue, isApproved: true,
        });
        conversionCount++;

        const amount = program?.commissionType === CommissionType.FIXED
          ? program.commissionRate
          : Math.round(orderValue * ((program?.commissionRate ?? 10) / 100) * 100) / 100;

        await CommissionModel.create({
          conversionId: conversion._id, publisherId: link.publisherId, programId: link.programId,
          amount, status: pick([CommissionStatus.APPROVED, CommissionStatus.PENDING, CommissionStatus.PAID]),
        });

        await TrackingLinkModel.findByIdAndUpdate(link._id, { $inc: { clicks: 1, conversions: 1 } });
      } else {
        await TrackingLinkModel.findByIdAndUpdate(link._id, { $inc: { clicks: 1 } });
      }
    }
  }

  for (const publisher of publishers.slice(0, 8)) {
    await PayoutModel.create({
      publisherId: publisher._id, amount: randInt(50, 1500), method: pick(['PayPal', 'Bank transfer', 'Wise']),
      status: pick([PayoutStatus.REQUESTED, PayoutStatus.PROCESSING, PayoutStatus.PAID]),
    });
  }

  console.log(`Done. ${clickCount} clicks, ${conversionCount} conversions seeded.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
