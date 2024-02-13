export interface ICtfImageFields {
  fields: {
    title: string;
    file: {
      fileName: string;
      contentType: string;
      details: {
        image: {
          width: number;
          height: number;
        };
        size: number;
      };
      url: string;
    };
  };
}

export type ICtfImage = {
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  metadata: Object;
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  sys: Object;
  fields: {
    title: string;
    file: {
      fileName: string;
      contentType: string;
      details: {
        image: {
          width: number;
          height: number;
        };
        size: number;
      };
      url: string;
    };
  };
};
