import React from 'react'

function Team() {
  return (
  <>
  
<h1 class="  text-3xl lg:text-5xl font-medium text-slate-800 text-center big  mt-20">Meet Our Team</h1>
<p class="text-slate-500 text-center text-sm lg:text-lg alan">The people behind the product, passionate about what they do.</p>
<div class="flex flex-wrap items-center justify-center gap-6 mt-12">
     <div class="max-w-80 bg-black text-white rounded-2xl">
        <div class="relative -mt-px overflow-hidden rounded-2xl">
            <img src="/images/person6.jpg" alt="" class="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top"/>
            <div class="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent"></div>
        </div>
        <div class="px-4 pb-6 text-center">
            <p class="mt-4 text-xl">Bhawna Kashyap</p>
            <p class="text-md font-medium bg-gradient-to-r from-[#8B5CF6] via-[#9938CA] to-[#E0724A] text-transparent bg-clip-text">Director</p>
        </div>
    </div>
    <div class="w-80  bg-black text-white rounded-2xl">
        <div class="relative -mt-px overflow-hidden rounded-2xl">
            <img src="/images/person7.jpg" alt="" class="h-[290px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top"/>
            <div class="absolute bottom-0 z-10 h-40 w-full bg-gradient-to-t pointer-events-none from-black to-transparent"></div>
        </div>
        <div class="px-4 pb-6 text-center">
            <p class="mt-4 text-lg">Sanjeev Kashyap</p>
            <p class="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#9938CA] to-[#E0724A] text-transparent bg-clip-text">Manager</p>
        </div>
    </div>
    <div class="max-w-80 bg-black text-white rounded-2xl">
        <div class="relative -mt-px overflow-hidden rounded-2xl">
            <img src="/images/person4.jpg" alt="" class="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top"/>
            <div class="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent"></div>
        </div>
        <div class="px-4 pb-6 text-center">
            <p class="mt-4 text-lg">Yashvinder Kashyap</p>
            <p class="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#9938CA] to-[#E0724A] text-transparent bg-clip-text">Manager</p>
        </div>
    </div>
   
</div>
  </>
  )
}

export default Team