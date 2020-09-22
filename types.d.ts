
import { GeoJSON } from 'geojson';

interface Tag {
    name: string,
    value: string
}


interface TileFeaturePolygons {
    geometry: GeoJSON.Position[][],
    type: 3,
    tags: Tag[]
}

interface TileFeatureLines {
    geometry: GeoJSON.Position[][],
    type: 2,
    tags: Tag[]
}

interface TileFeaturePoints {
    geometry: GeoJSON.Position[],
    type: 1,
    tags: Tag[]
}

export type TileFeature = TileFeaturePoints | TileFeatureLines | TileFeaturePolygons;

export interface GeoJsonVtOptions {
  /**
  * max zoom to preserve detail on; can't be higher than 24
  */
    maxZoom?: number,

  /**
  * max zoom in the initial tile index
  */
    indexMaxZoom?: number,

  /**
  * 100000 max number of points per tile in the index
  */
    indexMaxPoints?: number,

  /**
  * tolerance: 3, simplification tolerance (higher means simpler)
  */
    tolerance?: number,

  /**
  * 4096, tile extent (both width and height)
  */
    extent?: number,

    /**
  * 64,   tile buffer on each side
  */
    buffer?: number,

  /**
  * false, whether to enable line metrics tracking for LineString/MultiLineString features
  */
    lineMetrics?: boolean,

  /**
  * null,    name of a feature property to promote to feature.id. Cannot be used with `generateId`
  */
    promoteId?: number | null,

  /**
  * false,  whether to generate feature ids. Cannot be used with `promoteId`
  */
    generateId?: boolean,

  /**
  * 0,     logging level (0 to disable, 1 or 2)
  */
    debug?: number
}

export interface TileGeoJsonVt {
    features: TileFeature[],
    numPoints: number,
    numSimplified: number,
    numFeatures: number,
    source: GeoJSON,
    x: number,
    y: number,
    z: number,
    transformed: boolean,
    minX: number,
    minY: number,
    maxX: number,
    maxY: number
}

export interface GeoJsonVT {
    getTile(z: number, x: number, y: number): TileGeoJsonVt | null;
}

export default function geojsonvt(data: GeoJSON, options: GeoJsonVtOptions): GeoJsonVT

