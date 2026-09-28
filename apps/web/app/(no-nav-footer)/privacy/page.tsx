import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { Container } from '@/components/ui/Container';
import PrivacyPolicyPage from '@/components/rules/privacy-policy-page';

export const metadata = {
  title: 'Privacy policy',
  description: 'How smartfinds collects, uses, and protects your data.',
};

export default function PrivacyPage() {
  return (
    <>
      <main className="md:py-24 py-12">
        <Container>
          <PrivacyPolicyPage />
        </Container>
      </main>
    </>
  );
}
