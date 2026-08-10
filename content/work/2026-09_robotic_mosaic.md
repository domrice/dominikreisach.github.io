---
title: Robotic Mosaic
order: 1
category: computation
grad: 0
thumb: /imgs/2026-09_robotic_mosaic/rm0_dr_thumb.avif
hero:
  src: /imgs/2026-09_robotic_mosaic/rm9_dr
  credit: Mosaic Façade Panel | Photo © Spyridon Pyrgiotis, Ioanna Tatouli
media:
  - src: /imgs/2026-09_robotic_mosaic/rm1_dr.webm
    credit: Graphical User Interface Prototype for Planar Mosaic Fabrication | Video © Dominik Reisach
  - src: /imgs/2026-09_robotic_mosaic/rm2_dr.webm
    credit: Planar Mosaic Fabrication | Video © Dominik Reisach
  - src: /imgs/2026-09_robotic_mosaic/rm8_dr.webm
    credit: Earth Formwork Fabrication | Video © Spyridon Pyrgiotis, Ioanna Tatouli
  - src: /imgs/2026-09_robotic_mosaic/rm3_dr.webm
    credit: Mosaic Fabrication in Earth Formwork | Video © Spyridon Pyrgiotis, Ioanna Tatouli
  - src: /imgs/2026-09_robotic_mosaic/rm4_dr.webm
    credit: Tile Flipping | Video © Spyridon Pyrgiotis, Ioanna Tatouli
  - src: /imgs/2026-09_robotic_mosaic/rm7_dr.webm
    credit: Casting & Demolding | Video © Spyridon Pyrgiotis, Ioanna Tatouli
  - src: /imgs/2026-09_robotic_mosaic/rm0_dr
    credit: Mosaic Façade Panels | Photo © Spyridon Pyrgiotis, Ioanna Tatouli
    portrait: true
type: Research Project
year: 2025
place: ETH Zürich, CH
credits:
  - role: Supervision
    people:
      - name: Prof. Dr. Benjamin Dillenburger
        url: https://dbt.arch.ethz.ch/
  - role: Project Team
    people:
      - Dominik Reisach (Project Co-Lead)
      - Ming-Yang Wang (Project Co-Lead)
      - Spyridon Pyrgiotis
      - Ioanna Tatouli
      - Megi Sinani
      - Sukhdevsinh Parmar
  - role: Workshop Support
    people:
      - Tobias Hartmann
      - Philippe Fleischmann
      - Luca Petrus
      - Jonathan Leu
      - Michael Lyrenmann
      - Matineh Mahmoudi (Concrete Recipe)
  - role: Material Sponsors
    people:
      - name: JOHO Baukeramik + Bäder AG
        url: https://joho-baukeramik.ch
      - name: Ganz Baukeramik AG
        url: https://www.ganz-baukeramik.ch
  - role: Software
    people:
      - Python, OpenCV, YOLO11, SAM2, Rhino, Grasshopper
  - role: Hardware
    people:
      - ABB IRB1600, Intel RealSense D455f, Digging and Vacuum Gripping End Effectors
---

**Robotic Mosaic** explores a material-led workflow for transforming irregular ceramic waste into bespoke mosaic surfaces. Instead of forcing reclaimed tiles into a predetermined system, the process begins by perceiving and digitizing what is available. A vision-guided robotic setup identifies each tile’s shape, color, position, and orientation, creating a live material inventory that can evolve as new tiles are introduced.

Computational algorithms then translate this unpredictable collection into a coherent composition. Using color fields, directional vector fields, surface geometry, and signed distance functions, the system searches for viable positions for each individual tile while respecting its fixed shape and avoiding collisions. The result is not a mosaic generated from standardized digital elements, but a design negotiated between intention and material availability.

The workflow operates across both planar and free-form surfaces. On flat surfaces, automatic packing can be combined with manual decisions available through a Graphical User Interface. For three-dimensional architectural elements, a robotic arm first excavates and compacts an earth formwork. The tiles are then flipped, oriented, and embedded into the shaped earth before concrete is cast. Once the formwork is removed, the tiles become an integral mosaic finish within the concrete surface.

By connecting computer vision, computational design, and robotic fabrication, the project reframes waste as a source of possibility. Irregularity is not eliminated or standardized; it becomes an active part of the design process, enabling discarded materials to generate customized architectural surfaces.
