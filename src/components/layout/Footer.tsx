export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-aurora-text">
          <p>&copy; {new Date().getFullYear()} Schola Juris. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
} 