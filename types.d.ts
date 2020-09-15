
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
    maxZoom?: number,
    indexMaxZoom?: number,
    indexMaxPoints?: number,
    tolerance?: number,
    extent?: number,
    buffer?: number,
    lineMetrics?: boolean,
    promoteId?: number | null,
    generateId?: boolean,
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

export interface GeoJsonVT {
    getTile(z: number, x: number, y: number): TileGeoJsonVt | null;
}

export default function geojsonvt(data: GeoJSON, options: GeoJsonVtOptions): GeoJsonVT

