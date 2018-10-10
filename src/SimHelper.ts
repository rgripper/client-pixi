interface Structure {
  type: StructureType;
  position: Position;
  size: Size;
}

type PlayArea = { size: Size; structures: Structure[], zones: Zone[] };

enum ZoneType { Entry = 'ZoneType.Entry', Exit = 'ZoneType.Exit' }

interface Zone {
  type: ZoneType;
  position: Position;
}

interface Size {
  width: number;
  height: number;
}

interface Position {
  x: number;
  y: number;
}

const playAreaScript = `
╬═════════════╬══════════════════════════╬
║             ║                          ║
F             ║                          ║
F             ║    ╬═══  ══════╬══  ═════╬
║             ║    ║           ║         ║
║             ║    ║           ║         ║
║                  ║           ║         ║
║                  ║           ║         ║
╬═════════════╬════╬═══════════╬══  ═════╬
║             ║                          ║
║             ║                          ║                      
║             ╬══  ══╬       ════════════╬
║                    ║                   ║
║                    ║                   ║
║             ║      ║       ║           ║
║             ║      ║       ║           ║
╬═════SS══════╬══════╬═══════╬═══════════╬
`;

// particle size: 1cm
// wall size: 15 x 15 or 15 x 60

enum StructureType {
  Wall = 'StructureType.Wall'
}

const lines = playAreaScript
  .split("\n")
  .filter(line => line.length > 0)
  .map((line, iy) =>
    Array.from(line)
      .map(
        (block, ix) =>
          block === "S"
            ? ({
              type: ZoneType.Entry,
              position: { x: ix * 15, y: iy * 15 }
            } as Zone)
            : block === "F"
              ? ({
                type: ZoneType.Exit,
                position: { x: ix * 15, y: iy * 15 }
              } as Zone)
              : block !== " "
              ? ({
                  type: StructureType.Wall,
                  position: { x: ix * 15, y: iy * 15 },
                  size: { width: 15, height: 15 }
                } as Structure)
            : undefined
      )
  );

const structures = ([] as Structure[]).concat(...lines.map(z => z.filter(y => y && y.type === StructureType.Wall) as Structure[]));
const zones = ([] as Zone[]).concat(...lines.map(z => z.filter(y => y && (y.type === ZoneType.Entry || y.type === ZoneType.Exit)) as Zone[]));
const playAreaSize = { width: lines.length * 15, height: lines[0].length * 15 };
console.info(structures);
export function generatePlayArea(): PlayArea {
  return {
    size: playAreaSize,
    structures,
    zones
  }
  // gen boundaries, a floor plan with a start and end zones, check for passability
}



// export function generateInitHumanLocations(area: PlayArea): Position[] {
  
// }

// export function generateInitZombieLocations(area: PlayArea): Position[] {

// }
