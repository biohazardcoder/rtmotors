import { Navbar } from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

export const About = () => {
  const team = [
    {
      name: "John Doe",
      img: "/comments/developer.jpg",
      social: "#",
    },
    {
      name: "Jane Smith",
      img: "/comments/man.jpg",
      social: "#",
    },
     {
      name: "Emily Johnson",
      img: "/comments/designer.jpg",
      social: "#",
    },
  ];

  return (
    <div className="w-full bg-[#e7e7e7] pt-14">
      <Navbar />
      <div className="py-8 px-[5%]">
       <section className=" text-center">
        <img
          src="/logo.png"
          alt="Company Logo"
          className="mx-auto w-24 h-24 mb-4"
        />
        <h1 className="text-3xl font-bold mb-4">RT Motors Company</h1>
        <p className="max-w-2xl mx-auto text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
          Ad veritatis at sed qui. Aspernatur similique ullam recusandae, 
          officiis molestias suscipit nobis explicabo porro quod fuga enim sapiente voluptatum, 
          quis qui placeat iusto maiores assumenda sed excepturi. Doloremque nemo accusamus magni.
        </p>
      </section>

      
      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-8">Selers Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {team.map((member,index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-6 text-center"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 md:h-48 md:w-48 rounded-full mx-auto mb-4 object-center object-cover"
              />
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <div className="flex justify-center space-x-4 text-xl text-muted-foreground">
                <a href={member.social} target="_blank">
                 <Button className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white mt-4">
                  <Send/>
                   Contact
                 </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 px-6 text-center">
        <h2 className="text-2xl font-bold mb-6">How We Work</h2>
        <p className="max-w-3xl mx-auto text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia praesentium est distinctio atque magnam. 
          Assumenda similique, natus explicabo reprehenderit omnis distinctio dolorum molestiae nihil ipsa aspernatur aliquam.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto">
          <div className="p-6 bg-white shadow rounded-xl">
            <h3 className="font-bold mb-2 text-xl">1. Order</h3>
            <p className="text-muted-foreground">We find a car that meets the buyer's needs.</p>
          </div>
          <div className="p-6 bg-white shadow rounded-xl">
            <h3 className="font-bold mb-2 text-xl">2. Inspection</h3>
            <p className="text-muted-foreground">The car undergoes technical and legal inspection.</p>
          </div>
          <div className="p-6 bg-white shadow rounded-xl">
            <h3 className="font-bold mb-2 text-xl">3. Delivery</h3>
            <p className="text-muted-foreground">Delivery and registration for buyers.</p>
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-6">Our Location</h2>
        <div className="max-w-5xl mx-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.7474014112335!2d69.27973771571658!3d41.311158979271846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzQwLjIiTiA2OcKwMTYnNTAuOSJF!5e0!3m2!1sen!2s!4v1678979876543"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row gap-2">
            <Input
            type="text"
            placeholder="Name"
            className="w-full bg-white"
          />
          <Input
            type="email"
            placeholder="Email"
            className="w-full bg-white"
          />
            <Input
            type="text"
            placeholder="Phone"
            className="w-full bg-white"
          />
          </div>
          <Textarea
            placeholder="Message"
            className="w-full bg-white"
            rows={5}
          ></Textarea>
          <Button
            className="bg-blue-600 text-whitehover:text-white w-full md:w-auto hover:bg-blue-700"
          >
            Send Message
          </Button>
        </div>
      </section>
     </div>
      <Footer/>
    </div>
  );
};
