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
  Gavel,
  EyeOff
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
    position: new THREE.Vector3(4, 2, -1),
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
    position: new THREE.Vector3(-3, 3, 2),
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
    position: new THREE.Vector3(3, -3, -2),
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
    position: new THREE.Vector3(-4, 0, 3),
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
    position: new THREE.Vector3(-6, -2, 1),
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
    position: new THREE.Vector3(0, 5, -3),
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
    position: new THREE.Vector3(2, 4, -1),
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
    position: new THREE.Vector3(5, 4, 1),
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
    position: new THREE.Vector3(6, 1, -3),
    connections: ['isonomia', 'contraditorio', 'ampla-defesa'],
    color: '#0891B2',
    size: 1.0,
    importance: 8
  },
  {
    id: 'boa-fe-objetiva',
    name: 'Boa-fé Objetiva',
    category: 'Direito Contratual',
    description: 'Princípio de conduta ética nas relações contratuais',
    position: new THREE.Vector3(-2, -4, 4),
    connections: ['pacta-sunt-servanda', 'funcao-social-contrato'],
    color: '#16A34A',
    size: 0.9,
    importance: 7
  },
  {
    id: 'funcao-social-contrato',
    name: 'Função Social do Contrato',
    category: 'Direito Contratual',
    description: 'Limitação dos contratos pelo interesse social',
    position: new THREE.Vector3(-1, -2, 5),
    connections: ['pacta-sunt-servanda', 'boa-fe-objetiva'],
    color: '#CA8A04',
    size: 0.9,
    importance: 6
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
  { from: 'isonomia', to: 'devido-processo-legal', strength: 0.7, type: 'aplicacao' },
  { from: 'pacta-sunt-servanda', to: 'boa-fe-objetiva', strength: 0.6, type: 'aplicacao' },
  { from: 'pacta-sunt-servanda', to: 'funcao-social-contrato', strength: 0.5, type: 'contraste' },
  { from: 'boa-fe-objetiva', to: 'funcao-social-contrato', strength: 0.7, type: 'fundamental' }
];

export default function RedeNeuralPage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const nodesRef = useRef<Map<string, THREE.Group>>(new Map());
  const connectionsRef = useRef<THREE.Line[]>([]);
  const animationIdRef = useRef<number>();
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  
  const [selectedNode, setSelectedNode] = useState<ConceptNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<ConceptNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showConnections, setShowConnections] = useState(true);
  const [cameraDistance, setCameraDistance] = useState(15);

  const categories = Array.from(new Set(legalConcepts.map(concept => concept.category)));

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    scene.fog = new THREE.Fog(0xf8fafc, 10, 50);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, cameraDistance);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Enhanced Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -20;
    directionalLight.shadow.camera.right = 20;
    directionalLight.shadow.camera.top = 20;
    directionalLight.shadow.camera.bottom = -20;
    scene.add(directionalLight);

    // Rim lighting
    const rimLight = new THREE.DirectionalLight(0x4f46e5, 0.3);
    rimLight.position.set(-10, -10, -5);
    scene.add(rimLight);

    // Point lights for atmosphere
    const pointLight1 = new THREE.PointLight(0x3b82f6, 0.5, 20);
    pointLight1.position.set(8, 8, 8);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xef4444, 0.3, 15);
    pointLight2.position.set(-8, -8, 8);
    scene.add(pointLight2);

    // Create nodes and connections
    createEnhancedNodes();
    createEnhancedConnections();

    // Enhanced Controls
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isMouseDown = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      if (!isAnimating) {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        targetX = mouseX * 0.3;
        targetY = mouseY * 0.3;

        if (isMouseDown) {
          const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
          };

          const deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
              deltaMove.y * 0.01,
              deltaMove.x * 0.01,
              0,
              'XYZ'
            ));

          camera.quaternion.multiplyQuaternions(deltaRotationQuaternion, camera.quaternion);
        }

        previousMousePosition = { x: event.clientX, y: event.clientY };
      }

      // Raycasting for hover effects
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(
        Array.from(nodesRef.current.values()).map(group => group.children[0])
      );

      if (intersects.length > 0) {
        const hoveredMesh = intersects[0].object;
        const nodeId = hoveredMesh.userData.id;
        const concept = legalConcepts.find(c => c.id === nodeId);
        if (concept && hoveredNode?.id !== concept.id) {
          setHoveredNode(concept);
          document.body.style.cursor = 'pointer';
          
          // Highlight hovered node
          const nodeGroup = nodesRef.current.get(nodeId);
          if (nodeGroup) {
            const mesh = nodeGroup.children[0] as THREE.Mesh;
            const material = mesh.material as THREE.MeshPhongMaterial;
            material.emissive.setHex(0x222222);
          }
        }
      } else {
        if (hoveredNode) {
          // Remove highlight from previously hovered node
          const nodeGroup = nodesRef.current.get(hoveredNode.id);
          if (nodeGroup) {
            const mesh = nodeGroup.children[0] as THREE.Mesh;
            const material = mesh.material as THREE.MeshPhongMaterial;
            material.emissive.setHex(0x000000);
          }
        }
        setHoveredNode(null);
        document.body.style.cursor = 'default';
      }
    };

    const handleMouseDown = (event: MouseEvent) => {
      isMouseDown = true;
      previousMousePosition = { x: event.clientX, y: event.clientY };
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    const handleClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(
        Array.from(nodesRef.current.values()).map(group => group.children[0])
      );
      
      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        const nodeId = clickedMesh.userData.id;
        const concept = legalConcepts.find(c => c.id === nodeId);
        if (concept) {
          setSelectedNode(concept);
          highlightConnections(nodeId);
          
          // Animate camera to focus on selected node
          const nodePosition = concept.position.clone();
          const cameraTarget = nodePosition.clone().add(new THREE.Vector3(0, 0, 8));
          animateCameraTo(cameraTarget, nodePosition);
        }
      } else {
        setSelectedNode(null);
        resetHighlights();
      }
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const newDistance = Math.max(5, Math.min(30, cameraDistance + event.deltaY * 0.01));
      setCameraDistance(newDistance);
      
      if (!isAnimating) {
        camera.position.normalize().multiplyScalar(newDistance);
      }
    };

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('click', handleClick);
    renderer.domElement.addEventListener('wheel', handleWheel, { passive: false });

    // Enhanced Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (isAnimating) {
        // Smooth orbital rotation
        const radius = cameraDistance;
        camera.position.x = Math.cos(elapsedTime * 0.1) * radius;
        camera.position.z = Math.sin(elapsedTime * 0.1) * radius;
        camera.position.y = Math.sin(elapsedTime * 0.05) * 3;
        camera.lookAt(0, 0, 0);

        // Animate nodes with different patterns
        nodesRef.current.forEach((nodeGroup, id) => {
          const concept = legalConcepts.find(c => c.id === id);
          if (concept) {
            const mesh = nodeGroup.children[0] as THREE.Mesh;
            
            // Gentle rotation
            mesh.rotation.x = elapsedTime * 0.2 + concept.importance * 0.1;
            mesh.rotation.y = elapsedTime * 0.3 + concept.importance * 0.15;
            
            // Floating animation based on importance
            const floatOffset = Math.sin(elapsedTime * 0.5 + concept.importance) * 0.3;
            nodeGroup.position.y = concept.position.y + floatOffset;
            
            // Pulsing effect for high importance nodes
            if (concept.importance >= 9) {
              const scale = 1 + Math.sin(elapsedTime * 2) * 0.1;
              mesh.scale.setScalar(scale);
            }
          }
        });

        // Animate connections
        connectionsRef.current.forEach((line, index) => {
          const material = line.material as THREE.LineBasicMaterial;
          const connection = connections[index];
          if (connection) {
            const opacity = 0.3 + Math.sin(elapsedTime * 2 + index) * 0.2;
            material.opacity = Math.max(0.1, opacity * connection.strength);
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

    // Handle resize
    const handleResize = () => {
      if (mountRef.current) {
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handleClick);
      renderer.domElement.removeEventListener('wheel', handleWheel);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      document.body.style.cursor = 'default';
    };
  }, [isAnimating, cameraDistance]);

  const createEnhancedNodes = () => {
    if (!sceneRef.current) return;

    legalConcepts.forEach(concept => {
      // Create node group
      const nodeGroup = new THREE.Group();
      
      // Main sphere with enhanced materials
      const geometry = new THREE.SphereGeometry(concept.size, 64, 64);
      const material = new THREE.MeshPhongMaterial({
        color: concept.color,
        shininess: 100,
        transparent: true,
        opacity: 0.9,
        specular: 0x222222
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { id: concept.id };

      // Inner glow sphere
      const innerGlowGeometry = new THREE.SphereGeometry(concept.size * 0.8, 32, 32);
      const innerGlowMaterial = new THREE.MeshBasicMaterial({
        color: concept.color,
        transparent: true,
        opacity: 0.3,
        side: THREE.BackSide
      });
      const innerGlow = new THREE.Mesh(innerGlowGeometry, innerGlowMaterial);
      mesh.add(innerGlow);

      // Outer glow effect
      const outerGlowGeometry = new THREE.SphereGeometry(concept.size * 1.3, 32, 32);
      const outerGlowMaterial = new THREE.MeshBasicMaterial({
        color: concept.color,
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide
      });
      const outerGlow = new THREE.Mesh(outerGlowGeometry, outerGlowMaterial);

      // Wireframe overlay for high importance nodes
      if (concept.importance >= 8) {
        const wireframeGeometry = new THREE.SphereGeometry(concept.size * 1.1, 16, 16);
        const wireframeMaterial = new THREE.MeshBasicMaterial({
          color: concept.color,
          wireframe: true,
          transparent: true,
          opacity: 0.3
        });
        const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
        nodeGroup.add(wireframe);
      }

      // Particle system for very important nodes
      if (concept.importance >= 9) {
        const particleCount = 20;
        const particleGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
          const radius = concept.size * 2;
          positions[i] = (Math.random() - 0.5) * radius;
          positions[i + 1] = (Math.random() - 0.5) * radius;
          positions[i + 2] = (Math.random() - 0.5) * radius;
        }
        
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
          color: concept.color,
          size: 0.1,
          transparent: true,
          opacity: 0.6
        });
        
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        nodeGroup.add(particles);
      }

      nodeGroup.add(mesh);
      nodeGroup.add(outerGlow);
      nodeGroup.position.copy(concept.position);

      sceneRef.current!.add(nodeGroup);
      nodesRef.current.set(concept.id, nodeGroup);
    });
  };

  const createEnhancedConnections = () => {
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
        // Create curved connection
        const start = fromConcept.position.clone();
        const end = toConcept.position.clone();
        const mid = start.clone().add(end).multiplyScalar(0.5);
        mid.y += 2; // Create arc

        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        let color;
        let lineWidth = 2;
        
        switch (connection.type) {
          case 'fundamental':
            color = 0xff3333;
            lineWidth = 3;
            break;
          case 'aplicacao':
            color = 0x33ff33;
            lineWidth = 2;
            break;
          case 'exemplo':
            color = 0x3333ff;
            lineWidth = 2;
            break;
          case 'contraste':
            color = 0xffff33;
            lineWidth = 2.5;
            break;
          default:
            color = 0x888888;
        }

        const material = new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity: connection.strength * 0.4,
          linewidth: lineWidth
        });

        const line = new THREE.Line(geometry, material);
        sceneRef.current!.add(line);
        connectionsRef.current.push(line);

        // Add connection particles for important connections
        if (connection.strength > 0.8) {
          const particleCount = 10;
          const particleGeometry = new THREE.BufferGeometry();
          const positions = new Float32Array(particleCount * 3);
          
          for (let i = 0; i < particleCount; i++) {
            const t = i / (particleCount - 1);
            const point = curve.getPoint(t);
            positions[i * 3] = point.x;
            positions[i * 3 + 1] = point.y;
            positions[i * 3 + 2] = point.z;
          }
          
          particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
          
          const particleMaterial = new THREE.PointsMaterial({
            color,
            size: 0.2,
            transparent: true,
            opacity: 0.8
          });
          
          const particles = new THREE.Points(particleGeometry, particleMaterial);
          sceneRef.current!.add(particles);
        }
      }
    });
  };

  const highlightConnections = (nodeId: string) => {
    // Reset all connections
    connectionsRef.current.forEach(line => {
      (line.material as THREE.LineBasicMaterial).opacity = 0.1;
    });

    // Reset all nodes
    nodesRef.current.forEach((nodeGroup, id) => {
      const mesh = nodeGroup.children[0] as THREE.Mesh;
      const material = mesh.material as THREE.MeshPhongMaterial;
      material.opacity = id === nodeId ? 1.0 : 0.3;
      material.emissive.setHex(0x000000);
    });

    // Highlight selected node
    const selectedNodeGroup = nodesRef.current.get(nodeId);
    if (selectedNodeGroup) {
      const mesh = selectedNodeGroup.children[0] as THREE.Mesh;
      const material = mesh.material as THREE.MeshPhongMaterial;
      material.emissive.setHex(0x444444);
    }

    // Highlight connections for selected node
    connections.forEach((connection, index) => {
      if (connection.from === nodeId || connection.to === nodeId) {
        const line = connectionsRef.current[index];
        if (line) {
          (line.material as THREE.LineBasicMaterial).opacity = connection.strength * 0.8;
        }

        // Highlight connected nodes
        const connectedId = connection.from === nodeId ? connection.to : connection.from;
        const connectedNodeGroup = nodesRef.current.get(connectedId);
        if (connectedNodeGroup) {
          const mesh = connectedNodeGroup.children[0] as THREE.Mesh;
          const material = mesh.material as THREE.MeshPhongMaterial;
          material.opacity = 0.8;
          material.emissive.setHex(0x222222);
        }
      }
    });
  };

  const resetHighlights = () => {
    // Reset all connections
    connectionsRef.current.forEach((line, index) => {
      const connection = connections[index];
      (line.material as THREE.LineBasicMaterial).opacity = connection.strength * 0.4;
    });

    // Reset all nodes
    nodesRef.current.forEach((nodeGroup) => {
      const mesh = nodeGroup.children[0] as THREE.Mesh;
      const material = mesh.material as THREE.MeshPhongMaterial;
      material.opacity = 0.9;
      material.emissive.setHex(0x000000);
    });
  };

  const animateCameraTo = (targetPosition: THREE.Vector3, lookAtTarget: THREE.Vector3) => {
    if (!cameraRef.current) return;

    const startPosition = cameraRef.current.position.clone();
    const duration = 1000; // 1 second
    const startTime = Date.now();

    const animateCamera = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      cameraRef.current!.position.lerpVectors(startPosition, targetPosition, easeProgress);
      cameraRef.current!.lookAt(lookAtTarget);
      
      if (progress < 1) {
        requestAnimationFrame(animateCamera);
      }
    };

    animateCamera();
  };

  const resetView = () => {
    if (cameraRef.current) {
      const targetPosition = new THREE.Vector3(0, 0, cameraDistance);
      animateCameraTo(targetPosition, new THREE.Vector3(0, 0, 0));
    }
    setSelectedNode(null);
    resetHighlights();
  };

  const filteredConcepts = legalConcepts.filter(concept => {
    const matchesSearch = concept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      concept.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || concept.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    createEnhancedConnections();
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
                Explore as conexões entre conceitos jurídicos em uma interface 3D interativa aprimorada.
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
                  Controles Visuais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-[#1d1d1f]">Conexões</label>
                    <Button
                      variant={showConnections ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowConnections(!showConnections)}
                    >
                      {showConnections ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#1d1d1f]">Distância da Câmera</label>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      value={cameraDistance}
                      onChange={(e) => setCameraDistance(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-xs text-[#86868b] text-center">{cameraDistance}m</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Legend */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1d1d1f] flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Legenda Interativa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm">
                    <div className="font-semibold text-[#1d1d1f] mb-3">Tipos de Conexão:</div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-1 bg-red-500 rounded"></div>
                        <div>
                          <div className="font-medium text-[#1d1d1f]">Fundamental</div>
                          <div className="text-xs text-[#86868b]">Base teórica essencial</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-1 bg-green-500 rounded"></div>
                        <div>
                          <div className="font-medium text-[#1d1d1f]">Aplicação</div>
                          <div className="text-xs text-[#86868b]">Uso prático do conceito</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-1 bg-blue-500 rounded"></div>
                        <div>
                          <div className="font-medium text-[#1d1d1f]">Exemplo</div>
                          <div className="text-xs text-[#86868b]">Caso específico</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-1 bg-yellow-500 rounded"></div>
                        <div>
                          <div className="font-medium text-[#1d1d1f]">Contraste</div>
                          <div className="text-xs text-[#86868b]">Tensão ou oposição</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <div className="font-semibold text-[#1d1d1f] mb-3">Efeitos Visuais:</div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-lg"></div>
                        <span className="text-[#86868b]">Nós com brilho e sombras</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-purple-500 rounded-full"></div>
                        <span className="text-[#86868b]">Wireframe para conceitos importantes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                        <span className="text-[#86868b]">Pulsação para alta importância</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hover Info */}
            {hoveredNode && (
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-sm font-bold text-blue-900">
                    Conceito em Foco
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="font-semibold text-blue-900">{hoveredNode.name}</div>
                    <div className="text-xs text-blue-700">{hoveredNode.category}</div>
                    <div className="text-xs text-blue-800">
                      Importância: {hoveredNode.importance}/10
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Selected Node Info */}
            {selectedNode && (
              <Card className="bg-white shadow-lg border-l-4" style={{ borderLeftColor: selectedNode.color }}>
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
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-[#1d1d1f]">Importância:</span>
                      <div className="flex items-center space-x-1">
                        {[...Array(10)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < selectedNode.importance ? 'bg-yellow-400' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-[#1d1d1f]">Conexões ({selectedNode.connections.length}):</div>
                      {selectedNode.connections.map(connectionId => {
                        const connectedConcept = legalConcepts.find(c => c.id === connectionId);
                        const connection = connections.find(c => 
                          (c.from === selectedNode.id && c.to === connectionId) ||
                          (c.to === selectedNode.id && c.from === connectionId)
                        );
                        
                        return connectedConcept ? (
                          <div key={connectionId} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center space-x-2">
                              <div 
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: connectedConcept.color }}
                              ></div>
                              <span className="text-sm font-medium">{connectedConcept.name}</span>
                            </div>
                            {connection && (
                              <div className="flex items-center space-x-1">
                                <div 
                                  className="w-2 h-2 rounded-full"
                                  style={{ 
                                    backgroundColor: 
                                      connection.type === 'fundamental' ? '#ef4444' :
                                      connection.type === 'aplicacao' ? '#10b981' :
                                      connection.type === 'exemplo' ? '#3b82f6' : '#eab308'
                                  }}
                                ></div>
                                <span className="text-xs text-[#86868b] capitalize">
                                  {connection.type}
                                </span>
                              </div>
                            )}
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Enhanced 3D Visualization */}
          <div className="lg:col-span-3">
            <Card className="bg-white shadow-sm h-[700px] overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#1d1d1f] flex items-center justify-between">
                  <div className="flex items-center">
                    <Network className="w-5 h-5 mr-2" />
                    Visualização 3D Aprimorada
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-[#86868b]">
                    <span>Clique: Selecionar • Arrastar: Rotacionar • Scroll: Zoom</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Ativo</span>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-full">
                <div ref={mountRef} className="w-full h-full rounded-b-lg overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Concept List */}
        <div className="mt-8">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#1d1d1f] flex items-center justify-between">
                <div className="flex items-center">
                  <BookOpen className="w-6 h-6 mr-3" />
                  Conceitos Jurídicos ({filteredConcepts.length})
                </div>
                <div className="text-sm text-[#86868b]">
                  {selectedNode ? `Focado em: ${selectedNode.name}` : 'Clique em um conceito para focar'}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredConcepts.map(concept => (
                  <div
                    key={concept.id}
                    className={`p-6 border-2 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                      selectedNode?.id === concept.id 
                        ? 'border-blue-400 bg-blue-50 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ 
                      borderLeftColor: concept.color, 
                      borderLeftWidth: selectedNode?.id === concept.id ? '6px' : '4px' 
                    }}
                    onClick={() => {
                      setSelectedNode(concept);
                      highlightConnections(concept.id);
                    }}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div 
                        className="w-6 h-6 rounded-full shadow-md"
                        style={{ backgroundColor: concept.color }}
                      ></div>
                      <h3 className="font-bold text-[#1d1d1f] text-lg">{concept.name}</h3>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="text-sm text-[#86868b] font-medium">{concept.category}</div>
                      <p className="text-sm text-[#1d1d1f] leading-relaxed">{concept.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Zap className="w-4 h-4 text-[#86868b]" />
                          <span className="text-xs text-[#86868b]">
                            {concept.connections.length} conexões
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="flex space-x-1">
                            {[...Array(Math.min(5, concept.importance))].map((_, i) => (
                              <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {selectedNode?.id === concept.id && (
                        <div className="text-xs text-blue-600 font-semibold bg-blue-100 px-2 py-1 rounded-full">
                          Selecionado
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Mini Demonstrations */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 border-blue-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-blue-900 flex items-center">
                <Scale className="w-5 h-5 mr-2" />
                Hierarquia Conceitual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800 mb-4 text-sm leading-relaxed">
                Visualize como os princípios constitucionais fundamentam todo o ordenamento jurídico em uma estrutura hierárquica.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-2 bg-white/50 rounded-lg">
                  <div className="w-4 h-4 bg-red-600 rounded-full shadow-sm"></div>
                  <span className="text-sm font-semibold text-blue-900">Dignidade Humana</span>
                  <span className="text-xs text-blue-700 bg-blue-200 px-2 py-1 rounded-full">Base</span>
                </div>
                <div className="flex items-center space-x-3 p-2 bg-white/30 rounded-lg ml-4">
                  <div className="w-3 h-3 bg-purple-600 rounded-full shadow-sm"></div>
                  <span className="text-sm text-blue-800">Direitos Fundamentais</span>
                </div>
                <div className="flex items-center space-x-3 p-2 bg-white/20 rounded-lg ml-8">
                  <div className="w-2 h-2 bg-blue-600 rounded-full shadow-sm"></div>
                  <span className="text-sm text-blue-700">Personalidade Jurídica</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 border-green-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-green-900 flex items-center">
                <Gavel className="w-5 h-5 mr-2" />
                Tensões Jurídicas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-800 mb-4 text-sm leading-relaxed">
                Explore como princípios contratuais podem entrar em tensão e como o direito resolve esses conflitos.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                  <span className="text-sm font-semibold text-green-900">Pacta Sunt Servanda</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-1 bg-yellow-400 rounded animate-pulse"></div>
                    <span className="text-xs text-green-700 font-medium">vs</span>
                  </div>
                  <span className="text-sm font-semibold text-green-900">Rebus Sic Stantibus</span>
                </div>
                <div className="text-center">
                  <span className="text-xs text-green-700 bg-green-200 px-3 py-1 rounded-full">
                    Conexão de Contraste
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 via-purple-100 to-violet-100 border-purple-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-purple-900 flex items-center">
                <Network className="w-5 h-5 mr-2" />
                Rede de Conexões
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-800 mb-4 text-sm leading-relaxed">
                Veja como um conceito central se conecta a múltiplos outros, formando uma rede complexa de conhecimento.
              </p>
              <div className="text-center space-y-3">
                <div className="relative inline-flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    PJ
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-yellow-900">10</span>
                  </div>
                </div>
                <p className="text-sm font-semibold text-purple-900">Personalidade Jurídica</p>
                <div className="flex justify-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <p className="text-xs text-purple-600 bg-purple-200 px-3 py-1 rounded-full inline-block">
                  3 conexões ativas
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}