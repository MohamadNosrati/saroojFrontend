// src/react-compare-image.d.ts
declare module 'react-compare-image' {
    import { ComponentType, ReactElement, CSSProperties } from 'react';
  
    interface ReactCompareImageProps {
      // Required: URLs for the left and right images
      leftImage: string;
      rightImage: string;
  
      // Optional props
      aspectRatio?: 'taller' | 'wider';
      handle?: ReactElement | null;
      handleSize?: number;
      hover?: boolean;
      leftImageAlt?: string;
      leftImageCss?: CSSProperties;
      leftImageLabel?: string;
      onSliderPositionChange?: (position: number) => void;
      rightImageAlt?: string;
      rightImageCss?: CSSProperties;
      rightImageLabel?: string;
      skeleton?: ReactElement;
      sliderLineColor?: string;
      sliderLineWidth?: number;
      sliderPositionPercentage?: number;
      vertical?: boolean;
    }
  
    const ReactCompareImage: ComponentType<ReactCompareImageProps>;
    export default ReactCompareImage;
  }