import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <span className="text-lg font-bold">Schola Juris</span>
        {/* Adicionar links de navegação aqui */}
      </div>
    </nav>
  );
};

export default Navbar;