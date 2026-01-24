import Footer from "../footer/Footer"
import Navbar from "../navbar/Navbar"

const Layout = ({children}) => {
  
  return (
    <div className="min-h-screen flex flex-col ">
        {/* NAVBAR */}
      <header className="shrink-0">
        <Navbar />
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-pink-50/40">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="shrink-0">
        <Footer />
      </footer>
    </div>
  )
}

export default Layout