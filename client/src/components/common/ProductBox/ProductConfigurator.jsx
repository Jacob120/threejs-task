import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Link } from 'react-router-dom';

import styles from './ProductConfigurator.module.scss';
import { Row, Col, Card, Button, Dropdown } from 'react-bootstrap';

const ProductConfigurator = ({ id, name, price, oldPrice, addToCart }) => {
  const containerRef = useRef();
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [scene, setScene] = useState(null);
  const [table, setTable] = useState(null);
  const [woodFile, setWoodFile] = useState('lightWood.jpg');
  const [materialName, setMaterialName] = useState('');

  useEffect(() => {
    const camera = new THREE.PerspectiveCamera(
      5,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    setCamera(camera);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });

    renderer.setClearColor(0xffffff, 1);
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(renderer.domElement);
    setRenderer(renderer);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);
    scene.fog = new THREE.Fog(0xeeeeee, 200, 1000);

    // Enable shadow mapping in the renderer
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Create a light that casts shadows
    const light1 = new THREE.DirectionalLight(0xffffff, 1, 100);
    light1.position.set(70, 50, -50);

    light1.castShadow = true;

    light1.shadow.mapSize.width = 2048;
    light1.shadow.mapSize.height = 2048;
    light1.shadow.camera.top = 80;
    light1.shadow.camera.bottom = -80;
    light1.shadow.camera.left = -80;
    light1.shadow.camera.right = 80;

    scene.add(light1);

    const light2 = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(light2);

    camera.position.set(70, 20, -75);

    // Create table top and legs
    const createTable = () => {
      const tableTopGeometry = new THREE.BoxGeometry(7, 0.5, 5);
      const tableLegGeometry = new THREE.BoxGeometry(0.5, 3.3, 0.5);

      const woodTexture = new THREE.TextureLoader().load(
        `/images/materials/${woodFile}`
      );
      const woodMaterial = new THREE.MeshPhongMaterial({ map: woodTexture });

      const tableTop = new THREE.Mesh(tableTopGeometry, woodMaterial);
      const tableLeg1 = new THREE.Mesh(tableLegGeometry, woodMaterial);
      const tableLeg2 = new THREE.Mesh(tableLegGeometry, woodMaterial);
      const tableLeg3 = new THREE.Mesh(tableLegGeometry, woodMaterial);
      const tableLeg4 = new THREE.Mesh(tableLegGeometry, woodMaterial);

      tableLeg1.position.set(-3.25, -1.9, 2.25);
      tableLeg2.position.set(3.25, -1.9, 2.25);
      tableLeg3.position.set(3.25, -1.9, -2.25);
      tableLeg4.position.set(-3.25, -1.9, -2.25);

      tableTop.castShadow = true;
      tableLeg1.castShadow = true;
      tableLeg2.castShadow = true;
      tableLeg3.castShadow = true;
      tableLeg4.castShadow = true;

      tableTop.receiveShadow = true;

      const table = new THREE.Group();

      table.add(tableTop);
      table.add(tableLeg1);
      table.add(tableLeg2);
      table.add(tableLeg3);
      table.add(tableLeg4);

      return table;
    };

    const table = createTable();
    setTable(table);
    scene.add(table);

    // Add floor
    const floorGeometry = new THREE.BoxGeometry(2000, 0.1, 2000);
    const floorMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
    });

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.receiveShadow = true;
    floor.castShadow = false;
    floor.position.set(0, -3.5, 0);
    scene.add(floor);

    // Add controls that enables rotation and zoom
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI / 2;
    controls.enableRotate = true;
    controls.enableZoom = true;

    // Load object into the scene
    const objectLoader = new THREE.ObjectLoader();

    objectLoader.load('models/model.json', (object) => {
      object.position.set(0, 1.25, 0);
      object.rotateZ(Math.PI / 6);

      scene.add(object);
    });
    setScene(scene);
    // Rendering the scene
    const render = () => {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    };

    render();
  }, []);

  useEffect(() => {
    if (!table || !woodFile) return;

    const woodTexture = new THREE.TextureLoader().load(
      `/images/materials/${woodFile}`
    );
    table.traverse((node) => {
      if (node.isMesh) {
        node.material.map = woodTexture;
        node.material.needsUpdate = true;
      }
    });
  }, [table, woodFile]);

  const handleMaterialChange = (fileName, material) => {
    setWoodFile(fileName);
    setMaterialName(material);
  };

  return (
    <Card style={{ height: '100%' }} className={styles.card_wrapper}>
      <div className={styles.tree_body} ref={containerRef} />
      <Card.Body>
        <Row>
          <Col className={'mb-3 ' + styles.label}>
            <span className={'mx-1 ' + styles.label_sale}>Sale</span>
            <span className={'mx-1 ' + styles.label_top}>Top</span>

            <span className={'mx-1 ' + styles.label_out}>Out of Stock</span>
          </Col>
        </Row>
        <p className={styles.categories_text}>Dinning room, Table</p>
        <Card.Title>{name}</Card.Title>
        <Card.Text className='m-0 mb-1'>
          <span>
            <span className={styles.new_price}>Now ${price}</span>{' '}
            <span className={styles.old_price}>Was ${oldPrice}</span>
          </span>
        </Card.Text>
        <Row>
          <Col>
            <Dropdown>
              <Dropdown.Toggle
                variant='outline-secondary'
                id='material-dropdown'
              >
                Material
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() =>
                    handleMaterialChange('lightWood.jpg', 'Light Wood')
                  }
                >
                  Light wood
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    handleMaterialChange('darkWood.jpg', 'Dark Wood')
                  }
                >
                  Dark wood
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <Button
              variant='outline-secondary'
              onClick={() =>
                addToCart({ id, name, price, oldPrice }, 1, materialName)
              }
            >
              Add to cart
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProductConfigurator;
