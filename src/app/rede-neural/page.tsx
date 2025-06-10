'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Brain, 
  Zap, 
  Network, 
  Eye, 
  Settings,
  Play,
  Pause,
  RotateCcw,
  Maximize,
  Info,
  Filter,
  BookOpen,
  Scale,
  Gavel
} from 'lucide-react';
import * as THREE from 'three';

interface ConceptNode {
  id: string;
  name: string;
  category: string;
  description: string;
  position: THREE.Vector3;
  connections: string[];
  color: string;
  size: number;
  importance: number;
}

interface Connection {
  from: string;
  to: string;
  strength: number;
  type: 'fundamental' | 'aplicacao' | 'exemplo' | 'contraste';
}

const legalConcepts: ConceptNode[] = [
  {
    id: 'personalidade-juridica',
    name: 'Personalidade Jurídica',
    category: 'Direito Civil',
    description: 'Aptidão para ser sujeito de direitos e obrigações',
    position: new THREE.Vector3(0, 0, 0),
    connections: ['capacidade-civil', 'nascituro', 'pessoa-juridica'],
    color: '#3B82F6',
    size: 1.2,
    importance: 10
  },
  {
    id: 'capacidade-civil',
    name: 'Capacidade Civil',
    category: 'Direito Civil',
    description: 'Aptidão para exercer pessoalmente os atos da vida civil',
    position: new THREE.Vector3(3, 1, 0),
    connections: ['personalidade-juridica', 'incapacidade', 'emancipacao'],
    color: '#10B981',
    size: 1.0,
    importance: 8
  },
  {
    id: 'nascituro',
    name: 'Nascituro',
    category: 'Direito Civil',
    description: 'Ser humano concebido mas ainda não nascido',
    position: new THREE.Vector3(-2, 2, 1),
    connections: ['personalidade-juridica', 'direitos-fundamentais'],
    color: '#F59E0B',
    size: 0.8,
    importance: 6
  },
  {
    id: 'pessoa-juridica',
    name: 'Pessoa Jurídica',
    category: 'Direito Civil',
    description: 'Entidade abstrata com personalidade jurídica própria',
    position: new THREE.Vector3(2, -2, -1),
    connections: ['personalidade-juridica', 'sociedades', 'responsabilidade-civil'],
    color: '#8B5CF6',
    size: 1.1,
    importance: 9
  },
  {
    id: 'pacta-sunt-servanda',
    name: 'Pacta Sunt Servanda',
    category: 'Direito Contratual',
    description: 'Princípio da força obrigatória dos contratos',
    position: new THREE.Vector3(-3, 0, 2),
    connections: ['rebus-sic-stantibus', 'boa-fe-objetiva', 'funcao-social-contrato'],
    color: '#EF4444',
    size: 1.3,
    importance: 10
  },
  {
    id: 'rebus-sic-stantibus',
    name: 'Rebus Sic Stantibus',
    category: 'Direito Contratual',
    description: 'Teoria da imprevisão e onerosidade excessiva',
    position: new THREE.Vector3(-5, -1, 1),
    connections: ['pacta-sunt-servanda', 'caso-fortuito', 'forca-maior'],
    color: '#F97316',
    size: 1.0,
    importance: 7
  },
  {
    id: 'dignidade-humana',
    name: 'Dignidade da Pessoa Humana',
    category: 'Direito Constitucional',
    description: 'Princípio fundamental da Constituição',
    position: new THREE.Vector3(0, 4, -2),
    connections: ['direitos-fundamentais', 'personalidade-juridica', 'isonomia'],
    color: '#DC2626',
    size: 1.4,
    importance: 10
  },
  {
    id: 'direitos-fundamentais',
    name: 'Direitos Fundamentais',
    category: 'Direito Constitucional',
    description: 'Direitos básicos e essenciais protegidos constitucionalmente',
    position: new THREE.Vector3(1, 3, -1),
    connections: ['dignidade-humana', 'nascituro', 'isonomia'],
    color: '#7C3AED',
    size: 1.2,
    importance: 9
  },
  {
    id: 'isonomia',
    name: 'Princípio da Isonomia',
    category: 'Direito Constitucional',
    description: 'Igualdade formal e material perante a lei',
    position: new THREE.Vector3(3, 4, 0),
    connections: ['dignidade-humana', 'direitos-fundamentais', 'devido-processo-legal'],
    color: '#059669',
    size: 1.1,
    importance: 8
  },
  {
    id: 'devido-processo-legal',
    name: 'Devido Processo Legal',
    category: 'Direito Processual',
    description: 'Garantia de processo justo e regular',
    position: new THREE.Vector3(4, 2, -2),
    connections: ['isonomia', 'contraditorio', 'ampla-defesa'],
    color: '#0891B2',
    size: 1.0,
    importance: 8
  }
];

const connections: Connection[] = [
  { from: 'personalidade-juridica', to: 'capacidade-civil', strength: 0.9, type: 'fundamental' },
  { from: 'personalidade-juridica', to: 'nascituro', strength: 0.7, type: 'aplicacao' },
  { from: 'personalidade-juridica', to: 'pessoa-juridica', strength: 0.8, type: 'exemplo' },
  { from: 'pacta-sunt-servanda', to: 'rebus-sic-stantibus', strength: 0.8, type: 'contraste' },
  { from: 'dignidade-humana', to: 'direitos-fundamentais', strength: 0.95, type: 'fundamental' },
  { from: 'dignidade-humana', to: 'personalidade-juridica', strength: 0.6, type: 'aplicacao' },
  { from: 'direitos-fundamentais', to: 'nascituro', strength: 0.5, type: 'aplicacao' },
  { from: 'direitos-fundamentais', to: 'isonomia', strength: 0.8, type: 'exemplo' },
  { from: 'isonomia', to: 'devido-processo-legal', strength: 0.7, type: 'aplicacao' }
];

export default function RedeNeuralPage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const nodesRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const connectionsRef = useRef<THREE.Line[]>([]);
  const animationIdRef = useRef<number>();
  
  const [selectedNode, setSelectedNode] = useState<ConceptNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showConnections, setShowConnections] = useState(true);

  const categories = Array.from(new Set(legalConcepts.map(concept => concept.category)));

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f7);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 10);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Create nodes
    createNodes();
    createConnections();

    // Controls
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      targetX = mouseX * 0.5;
      targetY = mouseY * 0.5;
    };

    const handleClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(Array.from(nodesRef.current.values()));
      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object as THREE.Mesh;
        const nodeId = clickedMesh.userData.id;
        const concept = legalConcepts.find(c => c.id === nodeId);
        if (concept) {
          setSelectedNode(concept);
          highlightConnections(nodeId);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('click', handleClick);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      if (isAnimating) {
        // Rotate camera around the scene
        const time = Date.now() * 0.0005;
        camera.position.x = Math.cos(time) * 12;
        camera.position.z = Math.sin(time) * 12;
        camera.lookAt(0, 0, 0);

        // Animate nodes
        nodesRef.current.forEach((mesh, id) => {
          mesh.rotation.x += 0.01;
          mesh.rotation.y += 0.01;
          
          // Floating animation
          const concept = legalConcepts.find(c => c.id === id);
          if (concept) {
            mesh.position.y = concept.position.y + Math.sin(time + concept.importance) * 0.2;
          }
        });
      } else {
        // Manual camera control
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (targetY - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('click', handleClick);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isAnimating]);

  const createNodes = () => {
    if (!sceneRef.current) return;

    legalConcepts.forEach(concept => {
      // Create sphere geometry
      const geometry = new THREE.SphereGeometry(concept.size, 32, 32);
      
      // Create material with concept color
      const material = new THREE.MeshPhongMaterial({
        color: concept.color,
        shininess: 100,
        transparent: true,
        opacity: 0.8
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(concept.position);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { id: concept.id };

      // Add glow effect
      const glowGeometry = new THREE.SphereGeometry(concept.size * 1.2, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: concept.color,
        transparent: true,
        opacity: 0.2
      });
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      mesh.add(glowMesh);

      sceneRef.current!.add(mesh);
      nodesRef.current.set(concept.id, mesh);
    });
  };

  const createConnections = () => {
    if (!sceneRef.current || !showConnections) return;

    // Clear existing connections
    connectionsRef.current.forEach(line => {
      sceneRef.current!.remove(line);
    });
    connectionsRef.current = [];

    connections.forEach(connection => {
      const fromConcept = legalConcepts.find(c => c.id === connection.from);
      const toConcept = legalConcepts.find(c => c.id === connection.to);

      if (fromConcept && toConcept) {
        const points = [fromConcept.position, toConcept.position];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        let color;
        switch (connection.type) {
          case 'fundamental':
            color = 0xff0000;
            break;
          case 'aplicacao':
            color = 0x00ff00;
            break;
          case 'exemplo':
            color = 0x0000ff;
            break;
          case 'contraste':
            color = 0xffff00;
            break;
          default:
            color = 0x888888;
        }

        const material = new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity: connection.strength * 0.6
        });

        const line = new THREE.Line(geometry, material);
        sceneRef.current!.add(line);
        connectionsRef.current.push(line);
      }
    });
  };

  const highlightConnections = (nodeId: string) => {
    // Reset all connections
    connectionsRef.current.forEach(line => {
      (line.material as THREE.LineBasicMaterial).opacity = 0.2;
    });

    // Highlight connections for selected node
    connections.forEach((connection, index) => {
      if (connection.from === nodeId || connection.to === nodeId) {
        const line = connectionsRef.current[index];
        if (line) {
          (line.material as THREE.LineBasicMaterial).opacity = 0.8;
        }
      }
    });
  };

  const resetView = () => {
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 0, 10);
      cameraRef.current.lookAt(0, 0, 0);
    }
    setSelectedNode(null);
    
    // Reset connection highlighting
    connectionsRef.current.forEach(line => {
      (line.material as THREE.LineBasicMaterial).opacity = 0.6;
    });
  };

  const filteredConcepts = legalConcepts.filter(concept => {
    const matchesSearch = concept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      concept.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || concept.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    createConnections();
  }, [showConnections]);

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-[#1d1d1f] mb-4 flex items-center">
                <Brain className="w-10 h-10 mr-4 text-[#0071e3]" />
                Rede Neural Jurídica
              </h1>
              <p className="text-xl text-[#86868b]">
                Explore as conexões entre conceitos jurídicos em uma interface 3D interativa.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setIsAnimating(!isAnimating)}
                className="flex items-center space-x-2"
              >
                {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isAnimating ? 'Pausar' : 'Animar'}</span>
              </Button>
              <Button
                variant="outline"
                onClick={resetView}
                className="flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Controls Sidebar */}
          <div className="space-y-6">
            {/* Search */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1d1d1f] flex items-center">
                  <Search className="w-5 h-5 mr-2" />
                  Buscar Conceitos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="text"
                  placeholder="Digite um conceito..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-4"
                />
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#1d1d1f]">Categoria:</label>
                  <div className="space-y-2">
                    <Button
                      variant={selectedCategory === null ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(null)}
                      className="w-full justify-start"
                    >
                      Todas as categorias
                    </Button>
                    {categories.map(category => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className="w-full justify-start"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Visualization Controls */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1d1d1f] flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Controles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-[#1d1d1f]">Mostrar Conexões</label>
                    <Button
                      variant={showConnections ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowConnections(!showConnections)}
                    >
                      {showConnections ? <Eye className="w-4 h-4" /> : <Eye className="w-4 h-4 opacity-50" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1d1d1f] flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Legenda
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="font-semibold text-[#1d1d1f] mb-2">Tipos de Conexão:</div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-1 bg-red-500"></div>
                        <span className="text-[#86868b]">Fundamental</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-1 bg-green-500"></div>
                        <span className="text-[#86868b]">Aplicação</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-1 bg-blue-500"></div>
                        <span className="text-[#86868b]">Exemplo</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-1 bg-yellow-500"></div>
                        <span className="text-[#86868b]">Contraste</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <div className="font-semibold text-[#1d1d1f] mb-2">Categorias:</div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-[#86868b]">Direito Civil</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-[#86868b]">Direito Constitucional</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-[#86868b]">Direito Contratual</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Node Info */}
            {selectedNode && (
              <Card className="bg-white shadow-sm border-l-4" style={{ borderLeftColor: selectedNode.color }}>
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-[#1d1d1f]">
                    {selectedNode.name}
                  </CardTitle>
                  <div className="text-sm text-[#86868b]">{selectedNode.category}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-[#1d1d1f] mb-4 leading-relaxed">
                    {selectedNode.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-[#1d1d1f]">Conexões:</div>
                    {selectedNode.connections.map(connectionId => {
                      const connectedConcept = legalConcepts.find(c => c.id === connectionId);
                      return connectedConcept ? (
                        <div key={connectionId} className="text-sm text-[#86868b] flex items-center space-x-2">
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: connectedConcept.color }}
                          ></div>
                          <span>{connectedConcept.name}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* 3D Visualization */}
          <div className="lg:col-span-3">
            <Card className="bg-white shadow-sm h-[600px]">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1d1d1f] flex items-center">
                  <Network className="w-5 h-5 mr-2" />
                  Visualização 3D
                  <div className="ml-auto flex items-center space-x-2 text-sm text-[#86868b]">
                    <span>Clique nos nós para explorar</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-full">
                <div ref={mountRef} className="w-full h-full rounded-b-lg overflow-hidden" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Concept List */}
        <div className="mt-8">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#1d1d1f] flex items-center">
                <BookOpen className="w-6 h-6 mr-3" />
                Lista de Conceitos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredConcepts.map(concept => (
                  <div
                    key={concept.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    style={{ borderLeftColor: concept.color, borderLeftWidth: '4px' }}
                    onClick={() => setSelectedNode(concept)}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: concept.color }}
                      ></div>
                      <h3 className="font-semibold text-[#1d1d1f]">{concept.name}</h3>
                    </div>
                    <p className="text-sm text-[#86868b] mb-2">{concept.category}</p>
                    <p className="text-sm text-[#1d1d1f] leading-relaxed">{concept.description}</p>
                    <div className="mt-2 flex items-center space-x-2">
                      <Zap className="w-3 h-3 text-[#86868b]" />
                      <span className="text-xs text-[#86868b]">
                        {concept.connections.length} conexões
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mini Demonstrations */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-blue-900 flex items-center">
                <Scale className="w-5 h-5 mr-2" />
                Demonstração: Hierarquia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800 mb-4 text-sm">
                Visualize como os princípios constitucionais fundamentam todo o ordenamento jurídico.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  <span className="text-sm text-blue-900">Dignidade Humana (Base)</span>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-sm text-blue-800">Direitos Fundamentais</span>
                </div>
                <div className="flex items-center space-x-2 ml-8">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-sm text-blue-700">Personalidade Jurídica</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-green-900 flex items-center">
                <Gavel className="w-5 h-5 mr-2" />
                Demonstração: Conflitos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-800 mb-4 text-sm">
                Explore como princípios contratuais podem entrar em tensão.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-900">Pacta Sunt Servanda</span>
                  <span className="text-xs text-green-700">vs</span>
                  <span className="text-sm text-green-900">Rebus Sic Stantibus</span>
                </div>
                <div className="w-full h-1 bg-yellow-400 rounded"></div>
                <p className="text-xs text-green-700">Conexão de contraste</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-purple-900 flex items-center">
                <Network className="w-5 h-5 mr-2" />
                Demonstração: Rede
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-800 mb-4 text-sm">
                Veja como um conceito se conecta a múltiplos outros formando uma rede.
              </p>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 rounded-full text-white font-bold mb-2">
                  PJ
                </div>
                <p className="text-xs text-purple-700">Personalidade Jurídica</p>
                <div className="flex justify-center space-x-1 mt-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                </div>
                <p className="text-xs text-purple-600 mt-1">3 conexões ativas</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}