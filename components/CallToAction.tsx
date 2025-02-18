import Image from "next/image";

export default function CallToAction() {
  return (
    // Main container with flex properties and styling
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Want to learn more about JavaScript?
            </h2>
            <p className='text-gray-500 my-2'>
                Checkout these resources with 100 JavaScript Projects
            </p>
            <button className='btn btn-gradient from-purple-500 to-pink-500 rounded-tl-xl rounded-bl-none'>
                <a href="https://www.100jsprojects.com" target='_blank' rel='noopener noreferrer'>
                    100 JavaScript Projects
                </a>
            </button>
        </div>
        <div className="p-7 flex-1">
            <Image 
              src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg" 
              alt="JavaScript Projects" 
              width={600} 
              height={400} 
            />
        </div>
    </div>
  )
}