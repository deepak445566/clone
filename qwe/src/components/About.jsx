import React from 'react'
import AnimatedButton from "./v1/AnimatedButton"; 

function About() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-30 max-md:px-4 -mt-5 lg:mt-20" id='about'>
      
      <h1 className=" relative group text-3xl lg:text-6xl  uppercase font-semibold   bebas-neue-regular  lg:hidden text-slate-700 -ml-55 ">ABOUT US
                        <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-violet-500 transition-all group-hover:w-40"></span>
                    </h1>
                <div className="relative shadow-2xl  rounded-2xl overflow-hidden shrink-0 -mt-5 lg:mt-0">
                    
                    <img className=" w-90 object-cover h-80 lg:h-100 rounded-2xl "
                        src="/images/image10.jpg"
                        alt="" />
                    <div className="flex items-center gap-1 max-w-72 absolute bottom-8 left-8 bg-white p-2 rounded-xl">
                        <div className="flex -space-x-4 shrink-0">
                            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="image"
                                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-1" />
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="image"
                                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-[2]" />
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
                                alt="image"
                                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-[3]" />
                            <div
                                className="flex items-center justify-center text-xs  text-white size-9 rounded-full border-[3px] border-white bg-black hover:-translate-y-1 transition z-[4]">
                                10+
                            </div>
                        </div>
                        <p className="text-sm font-medium text-slate-800">Join And Learned</p>
                    </div>
                </div>
                <div className="text-sm text-slate-600 max-w-lg -mt-10 ">
                    <h1 className=" relative group  text-6xl  uppercase font-semibold  bebas-neue-regular hidden lg:block text-slate-700">ABOUT US
                        <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-violet-500 transition-all group-hover:w-40"></span>
                    </h1>
                    
                    <p className="mt-5 font-semibold ">PrebuiltUI helps you build faster by transforming your design vision into fully functional,
                        production-ready UI components. </p>
                    <p className="mt-4 font-semibold">Whether you're launching a SaaS app, landing page, or dashboard, our collection of Tailwind
                        CSS components is crafted to boost your development speed and improve user experience.</p>
                    <p className="mt-4 font-semibold">From UI design systems to automation-ready layouts, PrebuiltUI empowers you to build
                        beautifully and scale effortlessly.</p>
                    <button className="flex items-center gap-2 mt-8 hover:-translate-y-0.5 transition bg-white text-black  py-3 px-8 rounded-3xl  border-2 border-black text-lg"    onClick={() => window.open("https://docs.google.com/forms/u/0/d/e/1FAIpQLSekczarPQf-5IZ1Kf-6_eQhPtK34ShPaZfkURPQyjlcwtOIeQ/formResponse", "_blank")}>
                      
                         <AnimatedButton text="ENQUIRY"  />
                       
                    </button>
                </div>
            </section>
  )
}

export default About