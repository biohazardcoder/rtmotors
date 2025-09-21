import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axios from "axios";

export const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const BOT_TOKEN = "7705882088:AAGCJ_2Evhi7s76dRnaswtCRn0qSCPkmQ0U";
  const CHAT_ID = "-1002363441340";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (form.name.trim().length < 2) {
      toast.error("Name must be at least 2 characters long.");
      return false;
    }
    if (!form.email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (form.message.trim().length < 10) {
      toast.error("Message must be at least 10 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const text = `
📩 New message:
👤 Name: ${form.name}
📧 Email: ${form.email}
📱 Phone: ${form.phone}
💬 Message: ${form.message}
    `;

    setLoading(true);
    try {
      await axios.post(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          chat_id: CHAT_ID,
          text,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success("Message sent!");
      // Reset form after success ✅
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error(error);
      toast.error("Error sending message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex flex-col md:flex-row gap-2">
        <Input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="bg-white"
        />
        <Input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="bg-white"
        />
        <Input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="bg-white"
        />
      </div>
      <Textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Message"
        className="bg-white min-h-40"
      />
      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white w-full md:w-auto hover:bg-blue-700"
      >
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </div>
  );
};
