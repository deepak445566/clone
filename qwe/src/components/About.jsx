import React from 'react'
import AnimatedButton from "./v1/AnimatedButton"; 

function About() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-30 max-md:px-4 -mt-5 lg:mt-20 mont" id='about'>
      
      <h1 className=" relative group text-3xl lg:text-6xl  uppercase font-semibold big  lg:hidden text-slate-700 -ml-55 ">ABOUT US
                        <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-violet-500 transition-all group-hover:w-40"></span>
                    </h1>
                <div className="relative shadow-2xl  rounded-2xl overflow-hidden shrink-0 -mt-5 lg:mt-0">
                    
                    <img className=" w-90 object-cover h-80 lg:h-100 rounded-2xl "
                        src="/images/about1.jpg"
                        alt="" />
                    <div className="flex items-center gap-1 max-w-72 absolute bottom-8 left-8 bg-white p-2 rounded-xl">
                        <div className="flex -space-x-4 shrink-0">
                            <img src="/images/person3.jpg" alt="image"
                                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-1" />
                            <img src="/images/person1.jpg" alt="image"
                                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-[2]" />
                            <img src="/images/person2.jpg"
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
                <div className="text-sm text-slate-600 max-w-2xl -mt-10 ">
                    <h1 className=" relative group  text-5xl  uppercase font-semibold  big hidden lg:block text-slate-700">ABOUT US
                     
                    </h1>
                    
                    <p className="mt-5 font-semibold ">Despa Computer educational society  was established in 2010 to promote academic & technical education to society in affordable fees. DCC society runs a coaching & computer institute from more than 15 years. DCC  is primarily engaged in the areas of skill development and training .</p>
                    <p className="mt-4 font-semibold">We were also a Vocational training provides.We were also runs extension center of CDTP scheme ( Under Ministry of HRD) in 2012-2015. In Our Computer Institute we are trained more than 1000 students in last 17 years. DCC is also a center in Ghaziabad. </p>
                    <p className="mt-4 font-semibold">DCC's mission is to provide training and services to empower people, generate employment for the youth and unfold entrepreneurship based initiatives to create an inclusive society. its students through an interactive, learning oriented environment, state of the art infrastructure, cutting edge laboratories and well qualified, dedicated faculty but also through a holistic set of life skills that will groom students to face the industry in years to come.</p>
                    <button className="flex items-center gap-2 mt-8 hover:-translate-y-0.5 transition bg-white text-black  py-3 px-8 rounded-3xl  border-2 border-black text-lg"    onClick={() => window.open("https://docs.google.com/forms/u/0/d/e/1FAIpQLSekczarPQf-5IZ1Kf-6_eQhPtK34ShPaZfkURPQyjlcwtOIeQ/formResponse", "_blank")}>
                      
                         <AnimatedButton text="ENQUIRY"  />
                       
                    </button>
                </div>
            </section>
  )
}

export default About