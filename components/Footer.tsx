

export function Footer() {
  return (
    <footer className="bg-emerald-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
     
        <div className="flex justify-center flex-col items-center gap-2">
        
        <p className='text-center'> 
            {new Date().getFullYear()} &copy; - All Rights Reserved
        </p>
       <div>
         <a
            href="https://mohamed-ali-youssouf.com"
            className="flex items-center gap-2 hover:text-amber-400 transition-colors underline"
          >
        Mohamed Ali Youssouf
          </a>
       </div>
         
        </div>
      </div>
    </footer>
  );
}