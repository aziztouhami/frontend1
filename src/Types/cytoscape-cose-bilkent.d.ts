declare module 'cytoscape-cose-bilkent' {
    import cytoscape from 'cytoscape';
  
    interface CoseBilkentLayoutOptions {
      ready?: () => void;
      stop?: () => void;
      quality?: 'draft' | 'default' | 'proof';
      nodeDimensionsIncludeLabels?: boolean;
      refresh?: number;
      fit?: boolean;
      padding?: number;
      randomize?: boolean;
      nodeRepulsion?: number;
      idealEdgeLength?: number;
      edgeElasticity?: number;
      nestingFactor?: number;
      gravity?: number;
      numIter?: number;
      tile?: boolean;
      animate?: 'end' | 'during' | false;
      animationDuration?: number;
      tilingPaddingVertical?: number;
      tilingPaddingHorizontal?: number;
      gravityRangeCompound?: number;
      gravityCompound?: number;
      gravityRange?: number;
      initialEnergyOnIncremental?: number;
    }
  
    const coseBilkent: cytoscape.Ext;
    export = coseBilkent;
  }
  