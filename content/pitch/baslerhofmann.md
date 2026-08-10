---
grad: 4
lang: de
intro: >-
  Architektur-Informatiker mit Schwerpunkt auf algorithmischer Geometrie, Computer Vision und Softwareentwicklung sowie einer Leidenschaft für die Entwicklung eleganter digitaler Lösungen und automatisierter Workflows.
projects:
  - title: luxurious waste
    blurb: >-
      **Luxurious Waste** ist ein Forschungsprojekt zum Upcycling von Marmorbruch aus der Natursteinindustrie. In Partnerschaft mit [Lasa Marmo](https://www.lasamarmo.it) entwickle ich einen automatisierten Prozess, der aus Bruchplatten stabile Mauern und Mauermodule erzeugt. Ein von mir entwickelter Algorithmus wählt aus dem vorhandenen Materialbestand für jedes Bruchstück eine geeignete Position und überprüft dabei kontinuierlich die Stabilität sowohl des einzelnen Elements als auch der gesamten Mauer. Grundlage bilden hierfür digitalisierte Mauerwerksregeln, die in den Berechnungsprozess integriert sind. Die Bruchplatten werden mithilfe einer selbst entwickelten iPhone-App und Computer Vision direkt vor Ort erfasst und anschließend dem Algorithmus zur Verfügung gestellt. Zur Validierung des Systems habe ich mit einem Roboterarm Mauern in unterschiedlichen Geometrien aufgebaut – darunter gerade, C-förmige, abgewinkelte und verzweigte Strukturen. Da die Bruchplatten unterschiedliche Dicken aufweisen, wird zusätzlich Neopren als Ausgleichsmaterial eingesetzt. Auch dessen Verteilung und Platzierung werden algorithmisch bestimmt und vom Roboter ausgeführt. Ein Grafisches User Interface visualisiert den Aufbau und zeigt die Position des jeweils nächsten Elements, bevor dieses vom Roboter platziert wird.
    media:
      - src: /imgs/2026-07_luxurious_waste/lw01_dr
        credit: Gestapelte Marmor Mauer
      - src: /imgs/2026-07_luxurious_waste/lw02_dr
        credit: iPhone App zur Digitalisierung der Bruchstücke
      - src: /imgs/2026-07_luxurious_waste/lw03_dr
        credit: Anheben eines Bruchstücks von der Pick-Plattform
      - src: /imgs/2026-07_luxurious_waste/lw04_dr
        credit: Robotischer Prozess
      - src: /imgs/2026-07_luxurious_waste/lw05_dr
        credit: Algorithmische Enkodierung von Mauerwerksregeln
      - src: /imgs/2026-07_luxurious_waste/lw06_dr
        credit: Berechnung der Positionen des Ausgleichsmaterials
      - src: /imgs/2026-07_luxurious_waste/lw09_dr.webm
        credit: Details des Robotischen Prozesses
      - src: /imgs/2026-07_luxurious_waste/lw08_dr.webm
        credit: Stapeln einer C-förmigen Mauer mit GUI als Planungshilfe
      - src: /imgs/2026-07_luxurious_waste/lw10_dr.webm
        credit: Stapeln einer verzweigten Mauer
      - src: /imgs/2026-07_luxurious_waste/lw11_dr
        credit: Verzweigten Mauer
        portrait: true
      - src: /imgs/2026-07_luxurious_waste/lw12_dr
        credit: Verzweigten Mauer
        portrait: true
      - src: /imgs/2026-07_luxurious_waste/lw13_dr
        credit: Mauerecke
        portrait: true
      - src: /imgs/2026-07_luxurious_waste/lw14_dr
        credit: Mauerecke
        portrait: true
  - title: offcut tales
    blurb: >-
      **Offcut Tales** ist ein Forschungsprojekt und Teil meiner Masterarbeit mit Fokus auf Kreislaufwirtschaft und Automatisierung im Holzbau. Im Rahmen des Projektes habe ich das Rhino3D/Grasshopper-Plugin [Spruce Beetle](https://github.com/dominikreisach/Spruce-Beetle) in C# entwickelt, um die Nutzung von Restholz zu optimieren—vom computergestützten Entwurf bis zur robotischen Fertigung. Der Algorithmus hat Zugriff auf eine Datenbank mit Kappstücken und generiert deren Positionen, Verbindungen und die Fräsbahnen. Zur Validierung des Workflows habe ich eine Prototypen-Struktur entworfen und mit einem UR10e-Roboter gefertigt.
    media:
      - src: /imgs/2022-09_offcut_tales/ot11_dr
        credit: Foto © Michael Braun
      - src: /imgs/2022-09_offcut_tales/ot2i_dr
        credit: Holzkreislauf
      - src: /imgs/2022-09_offcut_tales/ot4i_dr
        credit: Entwurf der Prototypen-Struktur
      - src: /imgs/2022-09_offcut_tales/ot13_dr.webm
        credit: Grasshopper-Plugin Workflow
      - src: /imgs/2022-09_offcut_tales/ot6_dr.webm
        credit: Robotisches Fräsen der Holzverbindungen
        portrait: true
      - src: /imgs/2022-09_offcut_tales/ot7_dr.webm
        credit: Robotisches Fräsen der Holzverbindungen
        portrait: true
      - src: /imgs/2022-09_offcut_tales/ot9_dr
        credit: Foto © Michael Braun
      - src: /imgs/2022-09_offcut_tales/ot10_dr
        credit: Foto © Michael Braun
      - src: /imgs/2022-09_offcut_tales/ot12_dr
        credit: Foto © Michael Braun
  - title: robotic mosaic
    blurb: >-
      **Robotic Mosaic** erforscht das Upcycling von Keramikabfall zur Herstellung von Mosaiken. Zentraler Bestandteil ist ein von mir entwickelter Algorithmus, der digitalisierte Keramikbruchstücke anhand diverser Parameter kollisionsfrei anordnet. Dieser Algorithmus ist in einen Workflow integriert, bei dem ein Roboter die Bruchstücke mit einer integrierten Kamera digitalisiert. Dabei kommt eine Pipeline aus Computer Vision und maschinellem Lernen zur Erkennung von Form und Farbe zum Einsatz. Mosaikdesigns können in einer 2D-Prototyping-GUI generiert oder über Rhino3D/Grasshopper in den 3D-Raum übertragen werden. Die Fertigung erfolgt mithilfe eines robotischen Pick-and-Place-Systems: Für 2D-Mosaike werden die Bruchstücke direkt platziert, während 3D-Mosaike das Wenden der Bruchstücke mit einem zusätzlichen pneumatischen Greifer sowie ihre Platzierung in einer robotisch hergestellten Erdschalung erfordern. Das Design und die Herstellung der Fassadenpaneele erfolgten im Rahmen einer MAS-Abschlussarbeit. Das Erdschalungssystem wird in einem separaten Forschungsprojekt entwickelt.
    media:
      - src: /imgs/2026-09_robotic_mosaic/rm9_dr
        credit: Mosaik Fassadenpaneel | Foto © Spyridon Pyrgiotis, Ioanna Tatouli
      - src: /imgs/2026-09_robotic_mosaic/rm1_dr.webm
        credit: Graphical User Interface Prototyp für 2D Mosaike
      - src: /imgs/2026-09_robotic_mosaic/rm2_dr.webm
        credit: Robotisches Pick-and-Place für 2D-Mosaike
      - src: /imgs/2026-09_robotic_mosaic/rm8_dr.webm
        credit: Robotisches Ausheben der Erdschalung | Video © Spyridon Pyrgiotis, Ioanna Tatouli
      - src: /imgs/2026-09_robotic_mosaic/rm3_dr.webm
        credit: Robotisches Pick-and-Place für 3D-Mosaike | Video © Spyridon Pyrgiotis, Ioanna Tatouli
      - src: /imgs/2026-09_robotic_mosaic/rm4_dr.webm
        credit: Wenden eines Keramikbruchstücks | Video © Spyridon Pyrgiotis, Ioanna Tatouli
      - src: /imgs/2026-09_robotic_mosaic/rm7_dr.webm
        credit: Giessen des Fassadenpaneels | Video © Spyridon Pyrgiotis, Ioanna Tatouli
      - src: /imgs/2026-09_robotic_mosaic/rm0_dr
        credit: Mosaik Fassadenpaneele | Foto © Spyridon Pyrgiotis, Ioanna Tatouli
  - title: digital mosaic
    blurb: >-
      **Digital Mosaic** ist eine Weiterentwicklung von **Robotic Mosaic**. Der überarbeitete Algorithmus ordnet Keramikbruchstücke aus einem grossen Materialbestand effizient und kollisionsfrei zu Mosaiken auf ebenen und gekrümmten Oberflächen an. Dabei berücksichtigt er sowohl die tatsächliche Geometrie und Verfügbarkeit der einzelnen Stücke als auch gestalterische Vorgaben wie Farbe, Form, Muster und Ausrichtung—ohne die Bruchstücke zuzuschneiden oder zu verformen. Durch Parallelisierung können auch grossflächige und komplexe Oberflächen effizient gestaltet und somit skalierbare Anwendungen ermöglicht werden.
    media:
      - src: /imgs/2026-08_digital_mosaic/dm01_dr
        credit: Mosaik Boden mit 38.173 plazierten und insgesamt 50.492 getesten Bruchstücken. Laufzeit ca. 32 Minuten
      - src: /imgs/2026-08_digital_mosaic/dm02_dr
        credit: Mosaik Boden mit 38.173 plazierten und insgesamt 50.492 getesten Bruchstücken. Laufzeit ca. 32 Minuten
      - src: /imgs/2026-08_digital_mosaic/dm03_dr
        credit: Einfluss der Dekomposition auf die Laufzeit mit mehr als 7-facher Verbesserung
      - src: /imgs/2026-08_digital_mosaic/dm04_dr
        credit: Einfluss der Parallelisierung auf die Laufzeit
      - src: /imgs/2026-08_digital_mosaic/dm05_dr
        credit: Ei mit 9.521 plazierten und insgesamt 14.066 getesten Bruchstücken. Laufzeit ca. 9 Minuten
      - src: /imgs/2026-08_digital_mosaic/dm06_dr
        credit: Kuppel mit 28.502 plazierten und insgesamt 50.503 getesten Bruchstücken. Laufzeit ca. 35 Minuten
      - src: /imgs/2026-08_digital_mosaic/dm08_dr
        credit: Kuppel mit 28.502 plazierten und insgesamt 50.503 getesten Bruchstücken. Laufzeit ca. 35 Minuten
      - src: /imgs/2026-08_digital_mosaic/dm07_dr
        credit: Kuppel mit 28.502 plazierten und insgesamt 50.503 getesten Bruchstücken. Laufzeit ca. 35 Minuten

closing:
  title: team spirit
  text: >-
    In den vergangenen Jahren durfte ich mit Ingenieur*innen, Techniker*innen,
    Robotiker*innen, Designer*innen und Industriepartnern an interdisziplinären
    Fragestellungen arbeiten sowie Abschlussarbeiten und
    Praktikant*innen betreuen. Dabei habe ich gelernt, Brücken zwischen
    unterschiedlichen Fachbereichen zu schlagen, Wissen zu teilen und gemeinsam
    innovative Lösungen zu entwickeln. Eine offene und kollegiale
    Zusammenarbeit bildet für mich die Grundlage, um neue Ideen erfolgreich
    voranzutreiben.
---
