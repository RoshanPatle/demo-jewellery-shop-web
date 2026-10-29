import { usePageTitle } from '../hooks/useUi'
import { site } from '../config/site'

// Starter text for a demonstration storefront. Have the showroom's legal adviser review before launch.
const docs = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      ['What this site stores', 'Your shopping bag and wishlist are saved only in your own browser (local storage) so they are still there when you return. They are not sent to a server.'],
      ['Enquiries', 'When you use a WhatsApp button or the contact form, your message opens in WhatsApp. It is then handled under WhatsApp’s own terms and privacy policy. This website does not store the contents of your message.'],
      ['Cookies and analytics', 'This demonstration site does not set tracking cookies or use analytics. If analytics are added later, this policy will be updated.'],
      ['Your choices', 'You can clear your bag and wishlist at any time, or remove them by clearing this site’s data in your browser settings.'],
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    sections: [
      ['Demonstration storefront', 'The products, prices, purity and weight values shown are sample information for demonstration. They are not an offer for sale.'],
      ['Pricing', `Gold prices change through the day. The final price of any piece is confirmed directly with ${site.brandName} and may include making charges and taxes as applicable.`],
      ['Orders and payments', 'This website does not process online orders or payments. Purchases are completed with the showroom directly after you confirm details with the team.'],
      ['Images', 'Product images are illustrative and may differ slightly from the actual piece.'],
    ],
  },
}

export default function Legal({ kind }) {
  const doc = docs[kind]
  usePageTitle(doc.title)
  return (
    <div className="container-page max-w-3xl py-10 sm:py-16">
      <h1 className="h-section">{doc.title}</h1>
      <p className="mt-2 text-sm text-muted">Starter text. To be reviewed and replaced by {site.brandName} before launch.</p>
      <div className="mt-8 space-y-8">
        {doc.sections.map(([h, p]) => (
          <section key={h}>
            <h2 className="font-serif text-2xl font-semibold">{h}</h2>
            <p className="mt-2 text-[16px] leading-relaxed text-muted">{p}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
