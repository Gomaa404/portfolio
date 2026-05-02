import { motion } from "framer-motion";
import profileImg from "../assets/img.jpeg";

export default function About() {
  return (
    <section id="about" className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">About Me</h2>
          <div className="w-20 h-1 bg-primary rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Hello! My name is Abdallah and I enjoy creating things that live on the internet. My interest in web development started back when I decided to try editing custom Tumblr themes — turns out hacking together HTML & CSS taught me a lot about programming!
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Fast-forward to today, and I've had the privilege of building robust applications for a variety of clients. My main focus these days is building accessible, inclusive products and digital experiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative group w-full max-w-sm mx-auto md:ml-auto"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-2xl transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300 -z-10"></div>
            <img 
              src={profileImg}
              alt="Abdallah Mohamed Gomaa"
              loading="lazy"
              className="rounded-2xl object-cover aspect-square border border-border shadow-xl group-hover:grayscale-0 grayscale transition-all duration-300"
              style={{ objectPosition: "50% 20%" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
