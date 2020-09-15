
import { GeoJSON } from 'geojson';

interface Tag {
    name:string,
    value:string
}

interface TileFeature {
    geometry: GeoJSON.Geometry[],
            type: number,
            tags: Tag[]
}

export interface GeoJsonVtOptions {
maxZoom?: number,            // max zoom to preserve detail on
indexMaxZoom?: number,        // max zoom in the tile index
indexMaxPoints?: number, // max number of points per tile in the tile index
tolerance?: number,           // simplification tolerance (higher means simpler)
extent?: number,           // tile extent
buffer?: number,             // tile buffer on each side
lineMetrics?: boolean,     // whether to calculate line metrics
promoteId?: number,        // name of a feature property to be promoted to feature.id
generateId?: boolean,      // whether to generate feature ids. Cannot be used with promoteId
debug?: number     
}

export interface TileGeoJsonVt {
        features: TileFeature[],
        numPoints: number,
        numSimplified: number,
        numFeatures: number,
        source: any,
        x: number,
        y: number,
        z: number,
        transformed: boolean,
        minX: number,
        minY: number,
        maxX: number,
        maxY: number
}


export default function geojsonvt(data:GeoJSON, options:GeoJsonVtOptions) : {
    getTile(z: number,x: number, y: number): TileGeoJsonVt[];
  }

  declare module "geojson-vt" {
    export = geojsonvt;
  }