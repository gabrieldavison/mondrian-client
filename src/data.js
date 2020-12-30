const boxContent = `
<h1>This is a box </h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet purus et malesuada vehicula. Maecenas ullamcorper, enim vel ornare pretium, sapien ligula lacinia justo, et molestie ante quam at risus.</p>
<p>Phasellus at quam vel est aliquam hendrerit. Suspendisse non lacus pellentesque, semper dui vitae, finibus libero. Donec congue maximus commodo. Fusce porttitor luctus ultrices. Curabitur tempus lacus eu vestibulum posuere. Integer tincidunt, arcu vel rutrum elementum, orci nunc dignissim diam, efficitur viverra risus neque ac massa. Donec aliquet sagittis tempor.</p>
`;

export const data = {
  page1: {
    id: 1,
    url: "page1",
    boxes: [
      {
        id: 1,
        content: boxContent,
        order: 0,
      },
      {
        id: 2,
        content: boxContent,
        order: 1,
      },
      {
        id: 3,
        content: boxContent,
        order: 2,
      },
    ],
  },

  page2: {
    id: 2,
    url: "page2",
    boxes: [
      {
        id: 1,
        content: boxContent,
        order: 0,
      },
      {
        id: 2,
        content: boxContent,
        order: 1,
      },
      {
        id: 3,
        content: boxContent,
        order: 2,
      },
    ],
  },

  page3: {
    id: 2,
    url: "page3",
    boxes: [
      {
        id: 1,
        content: boxContent,
        order: 0,
      },
      {
        id: 2,
        content: boxContent,
        order: 1,
      },
      {
        id: 3,
        content: boxContent,
        order: 2,
      },
    ],
  },
};
