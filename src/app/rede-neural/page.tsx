'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Brain, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Info, 
  Network,
  Target,
  Lightbulb,
  BookOpen,
  Scale,
  Users,
  Building,
  Shield,
  Gavel,
  FileText,
  Award,
  Eye,
  Move3D
} from 'lucide-react';

// Dados dos conceitos jurídicos
const legalConcepts = [
  {
    id: 1,
    name: 'Personalidade Jurídica',
    category: 'Direito Civil',
    importance: 9,
    position: { x: 0, y: 0, z: 0 },
    color: '#3B82F6',
    connections: [2, 3, 4],
    description: 'Aptidão para ser sujeito de direitos e obrigações'
  },
  {
    id: 2,
    name: 'Capacidade Civil',
    category: 'Direito Civil',
    importance: 8,
    position: { x: 5, y: 2, z: -3 },
    color: '#10B981',
    connections: [1, 3, 5],
    description: 'Medida da personalidade jurídica'
  },
  {
    id: 3,
    name: 'Nascituro',
    category: 'Direito Civil',
    importance: 7,
    position: { x: -4, y: 3, z: 2 },
    color: '#F59E0B',
    connections: [1, 2],
    description: 'Ser humano concebido mas ainda não nascido'
  },
  {
    id: 4,
    name: 'Dignidade Humana',
    category: 'Direito Constitucional',
    importance: 10,
    position: { x: 3, y: -2, z: 4 },
    color: '#EF4444',
    connections: [1, 6, 7],
    description: 'Princípio fundamental da Constituição'
  },
  {
    id: 5,
    name: 'Boa-fé Objetiva',
    category: 'Direito Civil',
    importance: 8,
    position: { x: -2, y: 4, z: -2 },
    color: '#8B5CF6',
    connections: [2, 8, 9],
    description: 'Princípio que rege as relações contratuais'
  },
  {
    id: 6,
    name: 'Direitos Fundamentais',
    category: 'Direito Constitucional',
    importance: 9,
    position: { x: 6, y: -3, z: 1 },
    color: '#06B6D4',
    connections: [4, 7, 10],
    description: 'Direitos básicos garantidos pela Constituição'
  },
  {
    id: 7,
    name: 'Estado de Direito',
    category: 'Direito Constitucional',
    importance: 9,
    position: { x: -3, y: -4, z: 3 },
    color: '#84CC16',
    connections: [4, 6, 11],
    description: 'Princípio da submissão do Estado ao Direito'
  },
  {
    id: 8,
    name: 'Pacta Sunt Servanda',
    category: 'Direito Civil',
    importance: 7,
    position: { x: 4, y: 5, z: -4 },
    color: '#F97316',
    connections: [5, 9],
    description: 'Princípio da força obrigatória dos contratos'
  },
  {
    id: 9,
    name: 'Rebus Sic Stantibus',
    category: 'Direito Civil',
    importance: 6,
    position: { x: -5, y: 1, z: 5 },
    color: '#EC4899',
    connections: [5, 8],
    description: 'Teoria da imprevisão contratual'
  },
  {
    id: 10,
    name: 'Devido Processo Legal',
    category: 'Direito Processual',
    importance: 8,
    position: { x: 2, y: -5, z: -1 },
    color: '#6366F1',
    connections: [6, 11],
    description: 'Garantia fundamental do processo'
  },
  {
    id: 11,
    name: 'Ampla Defesa',
    category: 'Direito Processual',
    importance: 8,
    position: { x: -1, y: -2, z: -5 },
    color: '#14B8A6',
    connections: [7, 10],
    description: 'Direito de defesa em processos'
  }
];

export default function RedeNeuralPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const controlsRef = useRef<any>(null);
  const nodesRef = useRef<any[]>([]);
  const connectionsRef = useRef<any[]>([]);
  const animationIdRef = useRef<number>();
  const threeRef = useRef<any>(null); // Store Three.js library reference
  
  const [selectedConcept, setSelectedConcept] = useState<any>(null);
  const [hoveredConcept, setHoveredConcept] = useState<any>(null);
  const [cameraDistance, setCameraDistance] = useState([15]);
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

  // Inicializar Three.js
  useEffect(() => {
    if (!canvasRef.current) return;

    const initThreeJS = async () => {
      try {
        // Importar Three.js dinamicamente
        const THREE = await import('three');
        threeRef.current = THREE; // Store the Three.js library reference
        
        // Configurar cena
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf8fafc);
        scene.fog = new THREE.Fog(0xf8fafc, 10, 50);
        
        // Configurar câmera
        const camera = new THREE.PerspectiveCamera(
          75,
          canvasRef.current!.clientWidth / canvasRef.current!.clientHeight,
          0.1,
          1000
        );
        camera.position.set(15, 10, 15);
        camera.lookAt(0, 0, 0);
        
        // Configurar renderer
        const renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current!,
          antialias: true,
          alpha: true
        });
        renderer.setSize(canvasRef.current!.clientWidth, canvasRef.current!.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        
        // Iluminação
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        scene.add(directionalLight);
        
        const pointLight1 = new THREE.PointLight(0x4f46e5, 0.5, 30);
        pointLight1.position.set(-10, 5, 10);
        scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0x06b6d4, 0.5, 30);
        pointLight2.position.set(10, -5, -10);
        scene.add(pointLight2);
        
        // Criar nós
        const nodes: any[] = [];
        const nodeGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        
        legalConcepts.forEach((concept) => {
          // Material principal
          const material = new THREE.MeshPhongMaterial({
            color: concept.color,
            shininess: 100,
            specular: 0x222222,
            transparent: true,
            opacity: 0.9
          });
          
          const node = new THREE.Mesh(nodeGeometry, material);
          node.position.set(concept.position.x, concept.position.y, concept.position.z);
          node.castShadow = true;
          node.receiveShadow = true;
          node.userData = concept;
          
          // Glow effect
          const glowGeometry = new THREE.SphereGeometry(0.7, 16, 16);
          const glowMaterial = new THREE.MeshBasicMaterial({
            color: concept.color,
            transparent: true,
            opacity: 0.2
          });
          const glow = new THREE.Mesh(glowGeometry, glowMaterial);
          node.add(glow);
          
          // Wireframe para conceitos importantes
          if (concept.importance >= 8) {
            const wireframeGeometry = new THREE.SphereGeometry(0.52, 16, 16);
            const wireframeMaterial = new THREE.MeshBasicMaterial({
              color: concept.color,
              wireframe: true,
              transparent: true,
              opacity: 0.3
            });
            const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
            node.add(wireframe);
          }
          
          scene.add(node);
          nodes.push(node);
        });
        
        // Criar conexões
        const connections: any[] = [];
        const lineMaterial = new THREE.LineBasicMaterial({ 
          color: 0x64748b, 
          transparent: true, 
          opacity: 0.6 
        });
        
        legalConcepts.forEach((concept) => {
          concept.connections.forEach((targetId) => {
            const target = legalConcepts.find(c => c.id === targetId);
            if (target) {
              const points = [
                new THREE.Vector3(concept.position.x, concept.position.y, concept.position.z),
                new THREE.Vector3(target.position.x, target.position.y, target.position.z)
              ];
              
              const geometry = new THREE.BufferGeometry().setFromPoints(points);
              const line = new THREE.Line(geometry, lineMaterial);
              scene.add(line);
              connections.push(line);
            }
          });
        });
        
        // Raycaster para interação
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        
        // Salvar referências
        sceneRef.current = scene;
        rendererRef.current = renderer;
        cameraRef.current = camera;
        nodesRef.current = nodes;
        connectionsRef.current = connections;
        
        setIsLoading(false);
        
        // Função de animação
        const animate = () => {
          animationIdRef.current = requestAnimationFrame(animate);
          
          // Animações dos nós
          nodes.forEach((node, index) => {
            const time = Date.now() * 0.001;
            const concept = node.userData;
            
            // Rotação baseada na importância
            node.rotation.y += concept.importance * 0.001;
            
            // Flutuação sutil
            node.position.y = concept.position.y + Math.sin(time + index) * 0.1;
            
            // Pulsação para conceitos muito importantes
            if (concept.importance >= 9) {
              const scale = 1 + Math.sin(time * 2 + index) * 0.1;
              node.scale.setScalar(scale);
            }
          });
          
          // Animação das conexões
          connections.forEach((connection, index) => {
            const time = Date.now() * 0.001;
            const opacity = 0.3 + Math.sin(time + index) * 0.2;
            connection.material.opacity = Math.max(0.1, opacity);
          });
          
          renderer.render(scene, camera);
        };
        
        animate();
        
      } catch (error) {
        console.error('Erro ao inicializar Three.js:', error);
        setIsLoading(false);
      }
    };

    initThreeJS();

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Controles de mouse
  useEffect(() => {
    if (!canvasRef.current || !cameraRef.current || !threeRef.current) return;

    const canvas = canvasRef.current;
    const camera = cameraRef.current;
    const THREE = threeRef.current;

    const handleMouseDown = (event: MouseEvent) => {
      setIsDragging(true);
      setLastMousePosition({ x: event.clientX, y: event.clientY });
      canvas.style.cursor = 'grabbing';
    };

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });

      if (isDragging && cameraRef.current) {
        const deltaX = event.clientX - lastMousePosition.x;
        const deltaY = event.clientY - lastMousePosition.y;

        // Rotacionar câmera
        const spherical = new THREE.Spherical();
        spherical.setFromVector3(camera.position);
        
        spherical.theta -= deltaX * 0.01;
        spherical.phi += deltaY * 0.01;
        spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));

        camera.position.setFromSpherical(spherical);
        camera.lookAt(0, 0, 0);

        setLastMousePosition({ x: event.clientX, y: event.clientY });
      }

      // Raycasting para hover
      if (rendererRef.current && cameraRef.current && nodesRef.current.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const mouse = new THREE.Vector2();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(nodesRef.current);
        
        if (intersects.length > 0) {
          const concept = intersects[0].object.userData;
          setHoveredConcept(concept);
          canvas.style.cursor = 'pointer';
        } else {
          setHoveredConcept(null);
          canvas.style.cursor = isDragging ? 'grabbing' : 'grab';
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      canvas.style.cursor = 'grab';
    };

    const handleClick = (event: MouseEvent) => {
      if (!isDragging && hoveredConcept) {
        setSelectedConcept(hoveredConcept);
        
        // Animar câmera para o conceito selecionado
        if (cameraRef.current) {
          const targetPosition = hoveredConcept.position;
          const camera = cameraRef.current;
          
          const startPosition = camera.position.clone();
          const endPosition = new THREE.Vector3(
            targetPosition.x + 8,
            targetPosition.y + 5,
            targetPosition.z + 8
          );
          
          let progress = 0;
          const animateCamera = () => {
            progress += 0.02;
            if (progress <= 1) {
              camera.position.lerpVectors(startPosition, endPosition, progress);
              camera.lookAt(targetPosition.x, targetPosition.y, targetPosition.z);
              requestAnimationFrame(animateCamera);
            }
          };
          animateCamera();
        }
      }
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (cameraRef.current) {
        const camera = cameraRef.current;
        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);
        
        const distance = event.deltaY * 0.01;
        camera.position.addScaledVector(direction, distance);
        
        // Limitar distância
        const distanceFromOrigin = camera.position.length();
        if (distanceFromOrigin < 5) {
          camera.position.normalize().multiplyScalar(5);
        } else if (distanceFromOrigin > 30) {
          camera.position.normalize().multiplyScalar(30);
        }
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('wheel', handleWheel);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [isDragging, lastMousePosition, hoveredConcept]);

  // Controle de distância da câmera
  useEffect(() => {
    if (cameraRef.current) {
      const camera = cameraRef.current;
      const direction = camera.position.clone().normalize();
      camera.position.copy(direction.multiplyScalar(cameraDistance[0]));
    }
  }, [cameraDistance]);

  // Reset da câmera
  const resetCamera = () => {
    if (cameraRef.current && threeRef.current) {
      const camera = cameraRef.current;
      const THREE = threeRef.current;
      const startPosition = camera.position.clone();
      const endPosition = new THREE.Vector3(15, 10, 15);
      
      let progress = 0;
      const animateReset = () => {
        progress += 0.03;
        if (progress <= 1) {
          camera.position.lerpVectors(startPosition, endPosition, progress);
          camera.lookAt(0, 0, 0);
          requestAnimationFrame(animateReset);
        }
      };
      animateReset();
    }
    setSelectedConcept(null);
    setCameraDistance([15]);
  };

  // Redimensionamento
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && rendererRef.current && cameraRef.current) {
        const width = canvasRef.current.clientWidth;
        const height = canvasRef.current.clientHeight;
        
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Direito Civil':
        return <Users className="w-4 h-4" />;
      case 'Direito Constitucional':
        return <Building className="w-4 h-4" />;
      case 'Direito Processual':
        return <Gavel className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#1d1d1f] mb-2">Rede Neural Jurídica</h1>
              <p className="text-xl text-[#86868b]">
                Explore as conexões entre conceitos jurídicos em uma visualização 3D interativa
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Visualização 3D */}
          <div className="lg:col-span-3">
            <Card className="bg-white shadow-sm h-[700px] overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-[#1d1d1f] flex items-center">
                    <Network className="w-5 h-5 mr-2 text-purple-600" />
                    Visualização 3D Interativa
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetCamera}
                      className="flex items-center space-x-1"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Reset</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 h-full">
                <div className="relative w-full h-full rounded-b-lg overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full cursor-grab active:cursor-grabbing"
                    style={{ display: 'block' }}
                  />
                  
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                        <p className="text-[#86868b] font-medium">Carregando visualização 3D...</p>
                      </div>
                    </div>
                  )}

                  {/* Controles de Câmera */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-[#1d1d1f] mb-2 block">
                          Distância da Câmera
                        </label>
                        <Slider
                          value={cameraDistance}
                          onValueChange={setCameraDistance}
                          min={5}
                          max={30}
                          step={1}
                          className="w-32"
                        />
                        <div className="text-xs text-[#86868b] mt-1">
                          {cameraDistance[0]}m
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Informações de Hover */}
                  {hoveredConcept && (
                    <div 
                      className="absolute bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg pointer-events-none z-10 max-w-xs"
                      style={{
                        left: mousePosition.x + 10,
                        top: mousePosition.y - 10,
                        transform: 'translate(0, -100%)'
                      }}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        {getCategoryIcon(hoveredConcept.category)}
                        <span className="text-sm font-semibold text-[#1d1d1f]">
                          {hoveredConcept.name}
                        </span>
                      </div>
                      <p className="text-xs text-[#86868b] mb-2">
                        {hoveredConcept.description}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#86868b]">Importância:</span>
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < hoveredConcept.importance / 2 
                                  ? 'bg-purple-500' 
                                  : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Instruções */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                    <div className="text-xs text-[#86868b] space-y-1">
                      <div className="flex items-center space-x-2">
                        <Move3D className="w-3 h-3" />
                        <span>Arraste para rotacionar</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ZoomIn className="w-3 h-3" />
                        <span>Scroll para zoom</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-3 h-3" />
                        <span>Clique nos nós para focar</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Painel Lateral */}
          <div className="space-y-6">
            {/* Conceito Selecionado */}
            {selectedConcept ? (
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-[#1d1d1f] flex items-center">
                    <Info className="w-5 h-5 mr-2 text-purple-600" />
                    Conceito em Foco
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-[#1d1d1f] text-lg mb-2">
                        {selectedConcept.name}
                      </h3>
                      <div className="flex items-center space-x-2 mb-3">
                        {getCategoryIcon(selectedConcept.category)}
                        <span className="text-sm text-[#86868b]">
                          {selectedConcept.category}
                        </span>
                      </div>
                      <p className="text-[#86868b] text-sm leading-relaxed">
                        {selectedConcept.description}
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[#1d1d1f]">
                          Importância
                        </span>
                        <span className="text-sm text-[#86868b]">
                          {selectedConcept.importance}/10
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${selectedConcept.importance * 10}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-[#1d1d1f] mb-2">Conexões</h4>
                      <div className="space-y-2">
                        {selectedConcept.connections.map((connectionId: number) => {
                          const connectedConcept = legalConcepts.find(c => c.id === connectionId);
                          return connectedConcept ? (
                            <div 
                              key={connectionId}
                              className="flex items-center space-x-2 p-2 bg-[#f5f5f7] rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                              onClick={() => setSelectedConcept(connectedConcept)}
                            >
                              <div 
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: connectedConcept.color }}
                              ></div>
                              <span className="text-sm text-[#1d1d1f]">
                                {connectedConcept.name}
                              </span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-[#1d1d1f] flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-purple-600" />
                    Como Usar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-[#86868b]">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Arraste para rotacionar a visualização 3D</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Use o scroll do mouse para fazer zoom</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Clique nos nós para ver detalhes dos conceitos</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Passe o mouse sobre os nós para informações rápidas</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Legenda */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1d1d1f] flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-purple-600" />
                  Legenda
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-[#1d1d1f] mb-3">Categorias</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-[#86868b]">Direito Civil</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Building className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-[#86868b]">Direito Constitucional</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Gavel className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-[#86868b]">Direito Processual</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-[#1d1d1f] mb-3">Efeitos Visuais</h4>
                    <div className="space-y-2 text-sm text-[#86868b]">
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Brilho: Conceitos de alta importância</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Wireframe: Conceitos fundamentais</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Pulsação: Conceitos muito importantes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estatísticas */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1d1d1f] flex items-center">
                  <Award className="w-5 h-5 mr-2 text-purple-600" />
                  Estatísticas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      {legalConcepts.length}
                    </div>
                    <div className="text-xs text-[#86868b]">Conceitos</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {legalConcepts.reduce((acc, concept) => acc + concept.connections.length, 0)}
                    </div>
                    <div className="text-xs text-[#86868b]">Conexões</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {new Set(legalConcepts.map(c => c.category)).size}
                    </div>
                    <div className="text-xs text-[#86868b]">Categorias</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      {Math.round(legalConcepts.reduce((acc, c) => acc + c.importance, 0) / legalConcepts.length)}
                    </div>
                    <div className="text-xs text-[#86868b]">Importância Média</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}