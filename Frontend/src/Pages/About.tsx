import { motion } from 'framer-motion';
import { Award, Users, Lightbulb, ShieldCheck } from 'lucide-react';

const stats = [
  { label: 'Years of Experience', value: '15+' },
  { label: 'Happy Customers', value: '10K+' },
  { label: 'Unique Designs', value: '500+' },
  { label: 'Expert Artisans', value: '50+' },
];

const values = [
  {
    icon: <Award className="w-8 h-8 text-amber-600" />,
    title: 'Superior Quality',
    description: 'We use the finest materials and traditional techniques to ensure lasting beauty and durability.',
  },
  {
    icon: <Users className="w-8 h-8 text-amber-600" />,
    title: 'Customer Centric',
    description: 'Your satisfaction is our priority. We work closely with you to bring your vision to life.',
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-amber-600" />,
    title: 'Innovative Design',
    description: 'Blending modern aesthetics with functional design to create unique furniture pieces.',
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-amber-600" />,
    title: 'Ethical Sourcing',
    description: 'We are committed to sustainability and ethically sourced wood and materials.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Our Story</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
            Crafting elegance and comfort for your home since 2009. We believe every piece of furniture tells a story.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100"
            >
              <h3 className="text-4xl font-bold text-amber-600 mb-2">{stat.value}</h3>
              <p className="text-slate-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800">Our Philosophy</h2>
            <div className="w-20 h-1 bg-amber-600 mx-auto mb-8 rounded-full" />
            <p className="text-lg text-slate-600 leading-relaxed">
              At our core, we believe that furniture is more than just functional objects. It's about creating spaces where memories are made. Our artisans combine years of experience with modern technology to deliver masterpieces that stand the test of time.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-2xl hover:bg-slate-50 transition-colors duration-300"
              >
                <div className="mb-6 p-4 bg-amber-100 w-fit rounded-xl group-hover:bg-amber-600 transition-colors duration-300 group-hover:text-white">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold mb-4 text-slate-800">{value.title}</h4>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery/CTA */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-2xl h-[500px]"
          >
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2116&auto=format&fit=crop"
              alt="Artisan workspace"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">The Human Touch</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Every curve, every joint, and every finish is meticulously inspected by our master craftsmen. We take pride in the details that others might miss, because we know those details are what make our furniture special.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Join us in our journey to redefine home comfort and style. From the sustainable forests to your living room, we're with you every step of the way.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
