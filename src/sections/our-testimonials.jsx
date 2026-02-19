import SectionTitle from "../components/section-title";
import { motion } from "framer-motion";

export default function OurTestimonials() {
    const testimonials = [
        { quote: "The AI mock interviews felt incredibly real. I received an offer from Google just two weeks after practicing here!", name: "Richard Nelson", role: "Software Engineer", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200", },
        { quote: "The real-time feedback on my body language and tone was a game changer. I finally conquered my interview anxiety.", name: "Sophia Martinez", role: "Product Manager", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200", },
        { quote: "System Design was always my weakest point. The AI's deep dive into my architecture choices helped me level up significantly.", name: "Ethan Roberts", role: "Senior Developer", image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60", },
        { quote: "This platform is a must-have for anyone aiming for FAANG. The question bank is perfectly aligned with current industry trends.", name: "Isabella Kim", role: "Data Scientist", image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60", },
        { quote: "I loved the instant scoring. It gave me a clear roadmap of exactly what I needed to improve before my actual interview.", name: "Liam Johnson", role: "Backend Engineer", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop", },
        { quote: "From behavioral rounds to technical deep dives, this AI coach covers it all. I felt 10x more prepared than ever before.", name: "Ava Patel", role: "Full Stack Developer", image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png", },
    ];

    return (
        <section className="flex flex-col items-center" id="testimonials">
            <SectionTitle title="Success Stories" description="See how our candidates are using AI to master their interviews and land life-changing offers at top tech companies." />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-18 max-w-6xl mx-auto">
                {testimonials.map((testimonial, index) => (
                    <motion.div key={testimonial.name} className="group border border-slate-800 p-6 rounded-xl"
                        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: `${index * 0.15}`, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                    >
                        <p className="text-slate-100 text-base">{testimonial.quote}</p>
                        <div className="flex items-center gap-3 mt-8 group-hover:-translate-y-1 duration-300">
                            <img className="size-10 rounded-full" src={testimonial.image} alt="user image" />
                            <div>
                                <h2 className="text-gray-200 font-medium">
                                    {testimonial.name}
                                </h2>
                                <p className="text-indigo-500">{testimonial.role}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}