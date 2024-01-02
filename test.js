// 이미지 존재 여부를 확인하는 함수 선언
const checkImageExists = async (url) => {
  try {
    const response = await fetch(url);
    return response.status;  // 이미지가 존재하면 true, 아니면 false
  } catch (error) {
    console.error('Error checking image existence:', error);
    return false // 에러가 발생하면 이미지가 없다고 가정
  }
}

// console.log(checkImageExists("https://images.unsplash.com/photo-1702811083140-02bd169d06a4?ixid=M3w1NDU1NTl8MHwxfGFsbHw2MDR8fHx8fHwyfHwxNzAzODI4NjQ0fA&ixlib=rb-4.0.3"));

const newEmptyData = [];
const newExistData = [];

// 빈 데이터
const empty = [
  {
    "id": "g-cy0HBkp63pjGJrg_hJl",
    "tags": [
      "christmas",
      " laptop wallpaper",
      " gifts"
    ],
    "user_id": 2218222,
    "imgPath": "https://pixabay.com/get/g5563bf57771c874b676cf4131c68aa3cfd1532c7cfa8234f229f1971692ffe02d24bbf9136474d39410f6eddf5f18ea9e9d14dbcf699ae23e9a68bd47580116e_1280.jpg",
    "updated": "2023-12-29T04:14:48.294Z",
    "likes": 0,
    "from": "pixabay"
  },
  {
    "user_id": 35444888,
    "updated": "2023-12-29T04:14:20.953Z",
    "likes": 0,
    "id": "hQhpS3y29zGCm7FhTVdfT",
    "from": "pixabay",
    "tags": [
      "christmas",
      " baubles",
      " ornaments"
    ],
    "imgPath": "https://pixabay.com/get/g54581f96ae501890ad2ee881e9fea13539590715d3e1496af68f37365291dcf050f175cca99e93768a3dbfffd56318c97d6449014a9da5644dc74220e81f2643_1280.jpg"
  },
  {
    "tags": [
      "christmas",
      " sweet",
      " tradition"
    ],
    "likes": 0,
    "updated": "2023-12-29T04:15:24.312Z",
    "user_id": 20693007,
    "id": "EV80vXIMGd53cuNOdaMWU",
    "from": "pixabay",
    "imgPath": "https://pixabay.com/get/g5bbb9a49462d5ecb920450c345bcf27c6c30d99177c3bf0afa2775df8f6bcc46d2aae6c6ed48cde8161fba9a97948f302a47cd91de923ab7385dfb82ad5e5bb9_1280.jpg"
  },
  {
    "likes": 0,
    "updated": "2023-12-29T04:14:42.645Z",
    "user_id": 10328767,
    "from": "pixabay",
    "id": "t85dXBBZ7mIfwOq7xag5a",
    "imgPath": "https://pixabay.com/get/gab5f800bdda653f57e12c37b28959e02b7a92415e035f891b4e0903938d6e779215cce222144414093a35079104febfee36034660849aed3efc3343c25bcb03d_1280.jpg",
    "tags": [
      "christmas",
      " angel",
      " figure"
    ]
  },
  {
    "from": "pixabay",
    "id": "iCI0yRg1xlEcIbvUqPQ_W",
    "updated": "2023-12-29T04:13:45.636Z",
    "likes": 0,
    "imgPath": "https://pixabay.com/get/g23f35be0d7f92757e7844527bd7df6c1916b5467a78586f7cc47b136f2df1a7b0a0be239058452e9e4c52315484c05cba141494cb0ecf2ea5834c89f97e1e15d_1280.jpg",
    "user_id": 1425977,
    "tags": [
      "christmas",
      " advent",
      " decoration"
    ]
  },
  {
    "imgPath": "https://pixabay.com/get/g71886c639d4c8e0a165941a7ea638bdf1eca54a43417c07c75f2883fbbd4572bfe6e4b2e18d8ffdf1df7fe41bd626600ef357e3c7658a390da6881f89cd65267_1280.jpg",
    "id": "HA38yy0zHmji4Zks1uQlX",
    "updated": "2023-12-29T04:15:12.130Z",
    "user_id": 35444888,
    "tags": [
      "christmas",
      " baubles",
      " ornaments"
    ],
    "from": "pixabay",
    "likes": 0
  },
  {
    "user_id": 35444888,
    "likes": 0,
    "from": "pixabay",
    "updated": "2023-12-29T04:14:07.459Z",
    "imgPath": "https://pixabay.com/get/g100a180c9db9df8dc6b6391ee18a27526cf74986e580185ce75e56bb198af744b8a4ac1a07e0ed762d699af8f52fe41114e1cc54a0f767b0acbc088af47b7f9e_1280.jpg",
    "tags": [
      "christmas",
      " baubles",
      " ornaments"
    ],
    "id": "gOyMg2Yjny22-v4_7_jmX"
  },
  {
    "id": "gAemWoBAdbYldbdMmtBj9",
    "imgPath": "https://pixabay.com/get/gc1ff3121fcbe7a12e5f875bbc4e556b0f33a0db6df38649395b1a4ea8591348d412d49ee4b4919a64f5bb368e8b34fc462523a4b4d4f60f7f646ed3d23dc95e2_1280.jpg",
    "user_id": 35444888,
    "updated": "2023-12-29T04:15:41.763Z",
    "likes": 0,
    "from": "pixabay",
    "tags": [
      "christmas",
      " baubles",
      " ornaments"
    ]
  },
  {
    "id": "RvsW1wVdezWDtjdnTEnM8",
    "from": "pixabay",
    "likes": 0,
    "tags": [
      "christmas",
      " christmas tree",
      " advent"
    ],
    "updated": "2023-12-29T04:14:13.283Z",
    "imgPath": "https://pixabay.com/get/gfb04f70321c1200f83c05676bf853dad8bff8d72ff1c0690b044ce4b27b834493d27a712b5cebbb90893c18f1a853332c7aff50b77b86c3117d9718b12ab90c9_1280.jpg",
    "user_id": 1425977
  },
  {
    "id": "03wKCCokD9rcgxCD7UBds",
    "likes": 0,
    "from": "pixabay",
    "user_id": 35444888,
    "imgPath": "https://pixabay.com/get/gfdfdce3a44c438bd98146cda0c36b7c8ce482c1112ea874afe7c7dc2f80055e8726c0b454a18312ed6dc99f3ca51bf61a1f86b3f62c73861abcaafe48a873681_1280.jpg",
    "tags": [
      "christmas",
      " baubles",
      " ornaments"
    ],
    "updated": "2023-12-29T04:14:48.294Z"
  }
]

// 있는 데이터
const existData = [
  {
    "id": "fmItqGl7nilvYXnKpn36A",
    "imgPath": "https://images.unsplash.com/photo-1702811083140-02bd169d06a4?ixid=M3w1NDU1NTl8MHwxfGFsbHw2MDR8fHx8fHwyfHwxNzAzODI4NjQ0fA&ixlib=rb-4.0.3",
    "tags": [
      "dog",
      "cute",
      "no person",
      "animal",
      "nature",
      "fur",
      "canine",
      "winter",
      "looking",
      "snow",
      "portrait",
      "eye",
      "obedience",
      "funny",
      "sit",
      "mammal",
      "outdoors",
      "puppy",
      "friendly",
      "young"
    ],
    "updated": "2023-12-29T05:44:02.659Z",
    "user_id": "ZaJu8yO6wjM",
    "likes": 0,
    "from": "unsplash"
  },
  {
    "likes": 0,
    "imgPath": "https://images.unsplash.com/photo-1702234701277-44620711896c?ixid=M3w1NDU1NTl8MHwxfGFsbHwzNTN8fHx8fHwyfHwxNzAzODI4MzQ2fA&ixlib=rb-4.0.3",
    "tags": [
      "winter",
      "cute",
      "funny",
      "dog",
      "no person",
      "Christmas",
      "little",
      "portrait",
      "snow",
      "fur",
      "animal",
      "one",
      "downy",
      "fun",
      "sky",
      "outdoors",
      "mammal",
      "studio",
      "canine",
      "puppy"
    ],
    "id": "gNwX2wC6Wznv59tP9VY1C",
    "user_id": "zeY4JCM1nrE",
    "from": "unsplash",
    "updated": "2023-12-29T05:39:56.447Z"
  },
  {
    "imgPath": "https://images.unsplash.com/photo-1702529939203-04c666ee2b7f?ixid=M3w1NDU1NTl8MHwxfGFsbHw1MTB8fHx8fHwyfHwxNzAzODI4NTY5fA&ixlib=rb-4.0.3",
    "likes": 0,
    "id": "HGFXH3iFHm_vAamLM9q4M",
    "from": "unsplash",
    "user_id": "QIwoINLgpsA",
    "tags": [
      "dog",
      "cute",
      "portrait",
      "animal",
      "fur",
      "mammal",
      "friendship",
      "funny",
      "pet",
      "canine",
      "puppy",
      "love",
      "little",
      "people",
      "winter",
      "woman",
      "eye",
      "looking",
      "golden retriever",
      "sit"
    ],
    "updated": "2023-12-29T05:42:47.453Z"
  },
  {
    "likes": 0,
    "user_id": 9606149,
    "tags": [
      "dog",
      " ice skating",
      " winter"
    ],
    "id": "P7msEqNuR58OBAdPEhleD",
    "updated": "2023-12-29T04:13:03.583Z",
    "imgPath": "https://pixabay.com/get/gc454b54399a89907f41c614352472d69cd338ffa8c55ade9ebabdba0b10cc6b551f06e1d62a7942e0ae63cb8db46383d7dcfc91b13cc920db8225a853693075c_1280.jpg",
    "from": "pixabay"
  },
  {
    "from": "unsplash",
    "id": "5DheM4PM8wCM7biIkZlYg",
    "updated": "2023-12-29T05:36:20.270Z",
    "user_id": "kZUk6yjdWj0",
    "tags": [
      "cute",
      "dog",
      "little",
      "portrait",
      "funny",
      "Christmas",
      "animal",
      "fur",
      "lid",
      "canine",
      "studio",
      "puppy",
      "looking",
      "winter",
      "one",
      "sit",
      "no person",
      "humor",
      "mammal",
      "pet"
    ],
    "likes": 0,
    "imgPath": "https://images.unsplash.com/photo-1703344378005-4b9486658f62?ixid=M3w1NDU1NTl8MHwxfGFsbHwxNjR8fHx8fHwyfHwxNzAzODIzNjkwfA&ixlib=rb-4.0.3"
  },
  {
    "tags": [
      "cute",
      "Christmas",
      "winter",
      "fur",
      "portrait",
      "funny",
      "no person",
      "little",
      "animal",
      "dog",
      "lid",
      "one",
      "friendly",
      "studio",
      "looking",
      "eye",
      "cap",
      "canine",
      "downy",
      "sit"
    ],
    "user_id": "_pkvKyk6CiM",
    "updated": "2023-12-29T05:39:56.450Z",
    "likes": 0,
    "from": "unsplash",
    "imgPath": "https://images.unsplash.com/photo-1702906220516-11f24e4423c2?ixid=M3w1NDU1NTl8MHwxfGFsbHwzNzJ8fHx8fHwyfHwxNzAzODI4MzQ3fA&ixlib=rb-4.0.3",
    "id": "n74Fr1X_Ucu5dWodvytqf"
  },
  {
    "imgPath": "https://images.unsplash.com/photo-1702927437246-8f7cbfce349c?ixid=M3w1NDU1NTl8MHwxfGFsbHwzODV8fHx8fHwyfHwxNzAzODI4MzQ3fA&ixlib=rb-4.0.3",
    "user_id": "5fTGJB0n4WM",
    "likes": 0,
    "from": "unsplash",
    "id": "1x5xmEMZSZQn03BTAQeUb",
    "tags": [
      "funny",
      "cute",
      "dog",
      "humor",
      "portrait",
      "pet",
      "animal",
      "studio",
      "canine",
      "looking",
      "mammal",
      "bull",
      "puppy",
      "boxer",
      "young",
      "fur",
      "little",
      "one",
      "eye",
      "Christmas"
    ],
    "updated": "2023-12-29T05:39:56.451Z"
  },
  {
    "id": "TFPkp6fjycxM476kwF0qm",
    "tags": [
      "winter",
      "snow",
      "dog",
      "cold",
      "cute",
      "no person",
      "portrait",
      "funny",
      "animal",
      "pet",
      "fur",
      "canine",
      "mammal",
      "one",
      "Christmas",
      "outdoors",
      "little",
      "puppy",
      "looking",
      "eye"
    ],
    "user_id": "QIwoINLgpsA",
    "from": "unsplash",
    "updated": "2023-12-29T05:42:10.244Z",
    "imgPath": "https://images.unsplash.com/photo-1703053658436-27e36f06d20a?ixid=M3w1NDU1NTl8MHwxfGFsbHw0ODV8fHx8fHwyfHwxNzAzODI4NTMxfA&ixlib=rb-4.0.3",
    "likes": 0
  },
  {
    "likes": 0,
    "tags": [
      "funny",
      "dog",
      "cute",
      "portrait",
      "mammal",
      "humor",
      "one",
      "puppy",
      "no person",
      "canine",
      "animal",
      "studio",
      "pet",
      "fun",
      "little",
      "people",
      "looking",
      "bulldog",
      "sit",
      "Christmas"
    ],
    "user_id": "dg4S8j5TzmE",
    "id": "R302BXiTcfbW7MYLq2rgM",
    "imgPath": "https://images.unsplash.com/photo-1703136678192-53fda2c5c602?ixid=M3w1NDU1NTl8MHwxfGFsbHwzNzd8fHx8fHwyfHwxNzAzODI4MzQ3fA&ixlib=rb-4.0.3",
    "from": "unsplash",
    "updated": "2023-12-29T05:39:05.722Z"
  },
]

// 빈 데이터 + 정상 데이터
const combi = [
  {
    "id": "fmItqGl7nilvYXnKpn36A",
    "imgPath": "https://images.unsplash.com/photo-1702811083140-02bd169d06a4?ixid=M3w1NDU1NTl8MHwxfGFsbHw2MDR8fHx8fHwyfHwxNzAzODI4NjQ0fA&ixlib=rb-4.0.3",
    "tags": [
      "dog",
      "cute",
      "no person",
      "animal",
      "nature",
      "fur",
      "canine",
      "winter",
      "looking",
      "snow",
      "portrait",
      "eye",
      "obedience",
      "funny",
      "sit",
      "mammal",
      "outdoors",
      "puppy",
      "friendly",
      "young"
    ],
    "updated": "2023-12-29T05:44:02.659Z",
    "user_id": "ZaJu8yO6wjM",
    "likes": 0,
    "from": "unsplash"
  },
  {
    "likes": 0,
    "imgPath": "https://images.unsplash.com/photo-1702234701277-44620711896c?ixid=M3w1NDU1NTl8MHwxfGFsbHwzNTN8fHx8fHwyfHwxNzAzODI4MzQ2fA&ixlib=rb-4.0.3",
    "tags": [
      "winter",
      "cute",
      "funny",
      "dog",
      "no person",
      "Christmas",
      "little",
      "portrait",
      "snow",
      "fur",
      "animal",
      "one",
      "downy",
      "fun",
      "sky",
      "outdoors",
      "mammal",
      "studio",
      "canine",
      "puppy"
    ],
    "id": "gNwX2wC6Wznv59tP9VY1C",
    "user_id": "zeY4JCM1nrE",
    "from": "unsplash",
    "updated": "2023-12-29T05:39:56.447Z"
  },
  {
    "imgPath": "https://images.unsplash.com/photo-1702529939203-04c666ee2b7f?ixid=M3w1NDU1NTl8MHwxfGFsbHw1MTB8fHx8fHwyfHwxNzAzODI4NTY5fA&ixlib=rb-4.0.3",
    "likes": 0,
    "id": "HGFXH3iFHm_vAamLM9q4M",
    "from": "unsplash",
    "user_id": "QIwoINLgpsA",
    "tags": [
      "dog",
      "cute",
      "portrait",
      "animal",
      "fur",
      "mammal",
      "friendship",
      "funny",
      "pet",
      "canine",
      "puppy",
      "love",
      "little",
      "people",
      "winter",
      "woman",
      "eye",
      "looking",
      "golden retriever",
      "sit"
    ],
    "updated": "2023-12-29T05:42:47.453Z"
  },
  {
    "likes": 0,
    "user_id": 9606149,
    "tags": [
      "dog",
      " ice skating",
      " winter"
    ],
    "id": "P7msEqNuR58OBAdPEhleD",
    "updated": "2023-12-29T04:13:03.583Z",
    "imgPath": "https://pixabay.com/get/gc454b54399a89907f41c614352472d69cd338ffa8c55ade9ebabdba0b10cc6b551f06e1d62a7942e0ae63cb8db46383d7dcfc91b13cc920db8225a853693075c_1280.jpg",
    "from": "pixabay"
  },
  {
    "from": "unsplash",
    "id": "5DheM4PM8wCM7biIkZlYg",
    "updated": "2023-12-29T05:36:20.270Z",
    "user_id": "kZUk6yjdWj0",
    "tags": [
      "cute",
      "dog",
      "little",
      "portrait",
      "funny",
      "Christmas",
      "animal",
      "fur",
      "lid",
      "canine",
      "studio",
      "puppy",
      "looking",
      "winter",
      "one",
      "sit",
      "no person",
      "humor",
      "mammal",
      "pet"
    ],
    "likes": 0,
    "imgPath": "https://images.unsplash.com/photo-1703344378005-4b9486658f62?ixid=M3w1NDU1NTl8MHwxfGFsbHwxNjR8fHx8fHwyfHwxNzAzODIzNjkwfA&ixlib=rb-4.0.3"
  },
  {
    "tags": [
      "cute",
      "Christmas",
      "winter",
      "fur",
      "portrait",
      "funny",
      "no person",
      "little",
      "animal",
      "dog",
      "lid",
      "one",
      "friendly",
      "studio",
      "looking",
      "eye",
      "cap",
      "canine",
      "downy",
      "sit"
    ],
    "user_id": "_pkvKyk6CiM",
    "updated": "2023-12-29T05:39:56.450Z",
    "likes": 0,
    "from": "unsplash",
    "imgPath": "https://images.unsplash.com/photo-1702906220516-11f24e4423c2?ixid=M3w1NDU1NTl8MHwxfGFsbHwzNzJ8fHx8fHwyfHwxNzAzODI4MzQ3fA&ixlib=rb-4.0.3",
    "id": "n74Fr1X_Ucu5dWodvytqf"
  },
  {
    "user_id": 35444888,
    "likes": 0,
    "from": "pixabay",
    "updated": "2023-12-29T04:14:07.459Z",
    "imgPath": "https://pixabay.com/get/g100a180c9db9df8dc6b6391ee18a27526cf74986e580185ce75e56bb198af744b8a4ac1a07e0ed762d699af8f52fe41114e1cc54a0f767b0acbc088af47b7f9e_1280.jpg",
    "tags": [
      "christmas",
      " baubles",
      " ornaments"
    ],
    "id": "gOyMg2Yjny22-v4_7_jmX"
  },
  {
    "id": "gAemWoBAdbYldbdMmtBj9",
    "imgPath": "https://pixabay.com/get/gc1ff3121fcbe7a12e5f875bbc4e556b0f33a0db6df38649395b1a4ea8591348d412d49ee4b4919a64f5bb368e8b34fc462523a4b4d4f60f7f646ed3d23dc95e2_1280.jpg",
    "user_id": 35444888,
    "updated": "2023-12-29T04:15:41.763Z",
    "likes": 0,
    "from": "pixabay",
    "tags": [
      "christmas",
      " baubles",
      " ornaments"
    ]
  },
  {
    "id": "RvsW1wVdezWDtjdnTEnM8",
    "from": "pixabay",
    "likes": 0,
    "tags": [
      "christmas",
      " christmas tree",
      " advent"
    ],
    "updated": "2023-12-29T04:14:13.283Z",
    "imgPath": "https://pixabay.com/get/gfb04f70321c1200f83c05676bf853dad8bff8d72ff1c0690b044ce4b27b834493d27a712b5cebbb90893c18f1a853332c7aff50b77b86c3117d9718b12ab90c9_1280.jpg",
    "user_id": 1425977
  },
  {
    "id": "03wKCCokD9rcgxCD7UBds",
    "likes": 0,
    "from": "pixabay",
    "user_id": 35444888,
    "imgPath": "https://pixabay.com/get/gfdfdce3a44c438bd98146cda0c36b7c8ce482c1112ea874afe7c7dc2f80055e8726c0b454a18312ed6dc99f3ca51bf61a1f86b3f62c73861abcaafe48a873681_1280.jpg",
    "tags": [
      "christmas",
      " baubles",
      " ornaments"
    ],
    "updated": "2023-12-29T04:14:48.294Z"
  }
]

// DB 데이터를 받아서 넣어둔 배열을 인자로 넣음
const isEmpty = async (fbData) => {
  const proceed = await Promise.all(fbData.map(async (item) => {
    const result = await checkImageExists(item.imgPath);
    if (result === 200) return item;
    else return null;
  }));
  console.log('\n\n\n비어있는 것', proceed);
};

const isExist = async (fbData) => {
  const proceed = await Promise.all(fbData.map(async (item) => {
    const result = await checkImageExists(item.imgPath);
    if (result === 200) return item;
    else return null;
  }));
  console.log('\n\n\n정상인 거', proceed);
};

const isCombi = async (fbData) => {
  const proceed = await Promise.all(fbData.map(async (item) => {
    const result = await checkImageExists(item.imgPath);
    if (result === 200) return item;
    else return null;
  }));
  console.log('\n\n\n반반인 거', proceed);
};

// 비어있는 거
console.log('empty', isEmpty(empty));

console.log('-------------------구분선-----------------------');

// 정상인 거
console.log('exist', isExist(existData));

console.log('-------------------구분선-----------------------');

// 정상인 거
console.log('exist', isCombi(combi));