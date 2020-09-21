
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

/**
 * Data: GeoJSON
 * Options: 
 * 	maxZoom: 14,  max zoom to preserve detail on; can't be higher than 24
 *	tolerance: 3, simplification tolerance (higher means simpler)
 *	extent: 4096, tile extent (both width and height)
 *	buffer: 64,   tile buffer on each side
 *	debug: 0,     logging level (0 to disable, 1 or 2)
 *	lineMetrics: false, whether to enable line metrics tracking for LineString/MultiLineString features
 *	promoteId: null,    name of a feature property to promote to feature.id. Cannot be used with `generateId`
 *	generateId: false,  whether to generate feature ids. Cannot be used with `promoteId`
 *	indexMaxZoom: 5,    max zoom in the initial tile index
 *	indexMaxPoints: 100000 max number of points per tile in the index
 */
export default function geojsonvt(data: GeoJSON, options: GeoJsonVtOptions): GeoJsonVT

