import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { ContactForm } from "./ContactForm";

type SidebarItem = { term: string; value: string };

type Props = {
  label?: string;
  heading?: React.ReactNode;
  body?: string;
  sidebar?: SidebarItem[];
  whatsappUrl?: string;
};

export function ContactFormSection({
  label,
  heading,
  body,
  sidebar,
  whatsappUrl,
}: Props) {
  return (
    <section className="bg-bone-2 py-16 md:py-24 reveal-on-scroll">
      <div className="container-edge">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            {label && <SectionLabel label={label} />}
            {heading && (
              <h2 className="mt-6 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight max-w-[18ch] reveal-word">
                <span>{heading}</span>
              </h2>
            )}
            {body && (
              <p className="mt-6 text-ink-2 max-w-sm fade-up">{body}</p>
            )}

            {sidebar && sidebar.length > 0 && (
              <>
                <Hairline className="mt-10 mb-6" />
                <dl className="space-y-4 font-mono-label">
                  {sidebar.map((item) => (
                    <div key={item.term}>
                      <dt className="text-stone">{item.term}</dt>
                      <dd className="mt-1 text-ink">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <ContactForm whatsappUrl={whatsappUrl} />
          </div>
        </div>
      </div>
    </section>
  );
}
