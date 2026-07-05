import Input from "./Input";
import WindowButton from "./WindowButton";
import { SyntheticEvent, useState } from "react";
export default function Contact() {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
    response: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        body: JSON.stringify({ email: formData.email, msg: formData.message }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const data = await res.json();
      setFormData({ ...formData, response: data.message });
    } catch {
      setFormData({ ...formData, response: "Unable to reach the contact service." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-screen min-w-screen flex justify-center items-center">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="font-display uppercase mx-10 text-3xl md:text-4xl lg:text-6xl mb-6">
          establish contact
        </h2>
        <div className="signal-panel py-3 px-4 min-w-[30vw] max-w-2xl min-h-[384px] mx-3 lg:mx-auto font-mono">
          <div className="flex gap-2 mb-3">
            <WindowButton color="#EC6B5F" />
            <WindowButton color="#F4BF4F" />
            <WindowButton color="#61C554" />
          </div>
          <div>
            <p className="mb-6 border-y border-signal/50 py-2 text-xs text-amber">
              UPLINK DESTINATION // BEN@NERV.CO.NZ
            </p>
            <form action="/api/contact" method="POST" onSubmit={handleSubmit}>
              <span className="flex">
                nerv-terminal:~ ben$ curl POST /contact-form -d
              </span>
              <span className="flex flex-col">
                &apos;&#123;
                <div className="flex ml-6">
                  &quot;your_email&quot;:&quot;
                  <Input
                    name="email"
                    setter={(val: string) =>
                      setFormData({ ...formData, email: val })
                    }
                    value={formData.email}
                    placeholder="example@email.com"
                  />
                  &quot;,
                </div>
                <div className="flex ml-6">
                  &quot;msg&quot;:&quot;
                  <Input
                    name="msg"
                    value={formData.message}
                    setter={(val: string) =>
                      setFormData({ ...formData, message: val })
                    }
                    placeholder="your_message"
                  />
                  &quot;
                </div>
                &#125;&apos;
              </span>
              {formData.response === "" && formData.email !== "" && formData.message !== "" && (
                <button disabled={submitting} className="hover:underline opacity-70 disabled:opacity-40" type="submit">
                  {submitting ? "transmitting..." : "enter"}
                </button>
              )}
            </form>
            <p>{formData.response}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
