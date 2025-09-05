import { FaHeart, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border px-6 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>&copy; {new Date().getFullYear()} think-ed.</span>
          <span>Hecho con</span>
          <FaHeart className="text-destructive w-3 h-3" />
          <span>por DanielMMiralles</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
              <FaGithub size={16} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
              <FaTwitter size={16} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
              <FaLinkedin size={16} />
            </a>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Términos
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Soporte
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
