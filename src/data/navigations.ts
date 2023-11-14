const navigations = [
  {
    icon: "arrange-computer",
    title: "จัดสเป็กคอม",
    href: "/product/search/music",
    menuComponent: "MegaMenu1",
  },
  {
    //icon: "_pc-display-horizontal",
    icon: "_pc-display",
    title: "คอมพิวเตอร์เซ็ค",
    href: "/product/search/bikes",
    menuComponent: "MegaMenu2",
    menuData: [
      {
        icon: "_pc-display",
        title: "เซ็ต โปรโมชั่น",
        href: "/product/search/fashion",
        megaMenu: "MegaMenu1",
        menuData: {
          categories: [
            {
              title: "Man Clothes",
              href: "/product/search/man-clothes",
              subCategories: [
                {
                  title: "Shirt",
                  href: "/product/search/shirt",
                  imgUrl: "/assets/images/products/categories/shirt.png",
                },
                {
                  title: "T- shirt",
                  href: "/product/search/t-shirt",
                  imgUrl: "/assets/images/products/categories/t-shirt.png",
                },
                {
                  title: "Pant",
                  href: "/product/search/pant",
                  imgUrl: "/assets/images/products/categories/pant.png",
                },
                {
                  title: "Underwear",
                  href: "/product/search/underwear",
                  imgUrl: "/assets/images/products/categories/t-shirt.png",
                },
              ],
            },
            {
              title: "Accessories",
              href: "/product/search/accessories",
              subCategories: [
                {
                  title: "Belt",
                  href: "/product/search/belt",
                  imgUrl: "/assets/images/products/categories/belt.png",
                },
                {
                  title: "Hat",
                  href: "/product/search/Hat",
                  imgUrl: "/assets/images/products/categories/hat.png",
                },
                {
                  title: "Watches",
                  href: "/product/search/Watches",
                  imgUrl: "/assets/images/products/categories/watch.png",
                },
                {
                  title: "Sunglasses",
                  href: "/product/search/Sunglasses",
                  imgUrl: "/assets/images/products/categories/sunglass.png",
                },
              ],
            },
            {
              title: "Shoes",
              href: "/product/search/shoes",
              subCategories: [
                {
                  title: "Sneakers",
                  href: "/product/search/Sneakers",
                  imgUrl: "/assets/images/products/categories/sneaker.png",
                },
                {
                  title: "Sandals",
                  href: "/product/search/Sandals",
                  imgUrl: "/assets/images/products/categories/sandal.png",
                },
                {
                  title: "Formal",
                  href: "/product/search/Formal",
                  imgUrl: "/assets/images/products/categories/shirt.png",
                },
                {
                  title: "Casual",
                  href: "/product/search/Casual",
                  imgUrl: "/assets/images/products/categories/t-shirt.png",
                },
              ],
            },
            {
              title: "Bags",
              href: "/product/search/bags",
              subCategories: [
                {
                  title: "Backpack",
                  href: "/product/search/backpack",
                  imgUrl: "/assets/images/products/categories/backpack.png",
                },
                {
                  title: "Crossbody Bags",
                  href: "/product/search/Crossbody Bags",
                  imgUrl: "/assets/images/products/categories/bag.png",
                },
                {
                  title: "Side Bags",
                  href: "/product/search/Side Bags",
                  imgUrl: "/assets/images/products/categories/mini-bag.png",
                },
                {
                  title: "Slides",
                  href: "/product/search/Slides",
                  imgUrl: "/assets/images/products/categories/belt.png",
                },
              ],
            },
          ],
        },
      },
      {
        icon: "_pc-display",
        title: "เซ็ต ประจำเดือน",
        href: "/product/search/fashion",
        megaMenu: "MegaMenu1",
        menuData: {
          categories: [
            {
              title: "เซ็ต AMD",
              href: "/product/search/man-clothes",
              subCategories: [
                {
                  title: "Shirt",
                  href: "/product/search/shirt",
                  imgUrl: "/assets/images/products/categories/shirt.png",
                },
                {
                  title: "T- shirt",
                  href: "/product/search/t-shirt",
                  imgUrl: "/assets/images/products/categories/t-shirt.png",
                },
                {
                  title: "Pant",
                  href: "/product/search/pant",
                  imgUrl: "/assets/images/products/categories/pant.png",
                },
                {
                  title: "Underwear",
                  href: "/product/search/underwear",
                  imgUrl: "/assets/images/products/categories/t-shirt.png",
                },
              ],
            },
            {
              title: "Accessories",
              href: "/product/search/accessories",
              subCategories: [
                {
                  title: "Belt",
                  href: "/product/search/belt",
                  imgUrl: "/assets/images/products/categories/belt.png",
                },
                {
                  title: "Hat",
                  href: "/product/search/Hat",
                  imgUrl: "/assets/images/products/categories/hat.png",
                },
                {
                  title: "Watches",
                  href: "/product/search/Watches",
                  imgUrl: "/assets/images/products/categories/watch.png",
                },
                {
                  title: "Sunglasses",
                  href: "/product/search/Sunglasses",
                  imgUrl: "/assets/images/products/categories/sunglass.png",
                },
              ],
            },
            {
              title: "Shoes",
              href: "/product/search/shoes",
              subCategories: [
                {
                  title: "Sneakers",
                  href: "/product/search/Sneakers",
                  imgUrl: "/assets/images/products/categories/sneaker.png",
                },
                {
                  title: "Sandals",
                  href: "/product/search/Sandals",
                  imgUrl: "/assets/images/products/categories/sandal.png",
                },
                {
                  title: "Formal",
                  href: "/product/search/Formal",
                  imgUrl: "/assets/images/products/categories/shirt.png",
                },
                {
                  title: "Casual",
                  href: "/product/search/Casual",
                  imgUrl: "/assets/images/products/categories/t-shirt.png",
                },
              ],
            },
            {
              title: "Bags",
              href: "/product/search/bags",
              subCategories: [
                {
                  title: "Backpack",
                  href: "/product/search/backpack",
                  imgUrl: "/assets/images/products/categories/backpack.png",
                },
                {
                  title: "Crossbody Bags",
                  href: "/product/search/Crossbody Bags",
                  imgUrl: "/assets/images/products/categories/bag.png",
                },
                {
                  title: "Side Bags",
                  href: "/product/search/Side Bags",
                  imgUrl: "/assets/images/products/categories/mini-bag.png",
                },
                {
                  title: "Slides",
                  href: "/product/search/Slides",
                  imgUrl: "/assets/images/products/categories/belt.png",
                },
              ],
            },
          ],
        },
      },
     
    ],
  },
  {
    icon: "cpu",
    title: "ซีพียู",
    href: "/fashion",
    menuComponent: "MegaMenu1",
    menuData: {
      categories: [
        {
          title: "Processor",
          href: "/product/search/man-clothes",
          subCategories: [
            {
              title: "AMD",
              href: "/product/search/shirt",
              imgUrl: "/assets/images/products/categories/shirt.png",
            },
            {
              title: "INTEL",
              href: "/product/search/t-shirt",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
          ],
        },
        {
          title: "Socket type",
          href: "/product/search/accessories",
          subCategories: [
            {
              title: "AMD AM4",
              href: "/product/search/belt",
              imgUrl: "/assets/images/products/categories/belt.png",
            },
            {
              title: "AMD AM5",
              href: "/product/search/Hat",
              imgUrl: "/assets/images/products/categories/hat.png",
            },
            {
              title: "Intel LGA-1700",
              href: "/product/search/Watches",
              imgUrl: "/assets/images/products/categories/watch.png",
            },
          ],
        },
        {
          title: "Series",
          href: "/product/search/shoes",
          subCategories: [
            {
              title: "AMD Ryzen™ 5000 Series",
              href: "/product/search/Sneakers",
              imgUrl: "/assets/images/products/categories/sneaker.png",
            },
            {
              title: "AMD Ryzen™ 4000 Series",
              href: "/product/search/Sandals",
              imgUrl: "/assets/images/products/categories/sandal.png",
            },
            {
              title: "AMD Ryzen™ 7000 Series",
              href: "/product/search/Formal",
              imgUrl: "/assets/images/products/categories/shirt.png",
            },
            {
              title: "12th Gen Intel® Core™",
              href: "/product/search/Casual",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
            {
              title: "13th Gen Intel® Core™",
              href: "/product/search/Casual",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
            {
              title: "14th Gen Intel® Core™",
              href: "/product/search/Casual",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
          ],
        },
      ],
      // rightImage: {
      //   imgUrl: "/assets/images/promotion/offer-1.png",
      //   href: "/sale-page-1",
      // },
    },
  },
  {
    icon: "motherboard",
    title: "เมนบอร์ด",
    href: "/product/search/electronics",
    menuComponent: "MegaMenu1",
    menuData: {
      categories: [
        {
          title: "Brand",
          href: "/product/search/man-clothes",
          subCategories: [
            {
              title: "ASROCK",
              href: "/product/search/shirt",
              imgUrl: "/assets/images/products/categories/shirt.png",
            },
            {
              title: "ASUS",
              href: "/product/search/t-shirt",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
            {
              title: "GIGABYTE",
              href: "/product/search/pant",
              imgUrl: "/assets/images/products/categories/pant.png",
            },
            {
              title: "MSI",
              href: "/product/search/underwear",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
            {
              title: "NZXT",
              href: "/product/search/underwear",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
          ],
        },
        {
          title: "Socket type",
          href: "/product/search/accessories",
          subCategories: [
            {
              title: "AMD AM4",
              href: "/product/search/belt",
              imgUrl: "/assets/images/products/categories/belt.png",
            },
            {
              title: "AMD AM5",
              href: "/product/search/Hat",
              imgUrl: "/assets/images/products/categories/hat.png",
            },
            {
              title: "AMD sTRX4",
              href: "/product/search/Watches",
              imgUrl: "/assets/images/products/categories/watch.png",
            },
            {
              title: "Intel LGA-1700",
              href: "/product/search/Sunglasses",
              imgUrl: "/assets/images/products/categories/sunglass.png",
            },
            {
              title: "Intel LGA-1200",
              href: "/product/search/Sunglasses",
              imgUrl: "/assets/images/products/categories/sunglass.png",
            },
          ],
        },
        {
          title: "Chipset",
          href: "/product/search/shoes",
          subCategories: [
            {
              title: "AMD® B450",
              href: "/product/search/Sneakers",
              imgUrl: "/assets/images/products/categories/sneaker.png",
            },
            {
              title: "AMD® X670",
              href: "/product/search/Sandals",
              imgUrl: "/assets/images/products/categories/sandal.png",
            },
            {
              title: "AMD® B650",
              href: "/product/search/Formal",
              imgUrl: "/assets/images/products/categories/shirt.png",
            },
            {
              title: "AMD® TRX40",
              href: "/product/search/Casual",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
            {
              title: "AMD® A520",
              href: "/product/search/Casual",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
          ],
        },
        {
          title: "Bags",
          href: "/product/search/bags",
          subCategories: [
            {
              title: "Backpack",
              href: "/product/search/backpack",
              imgUrl: "/assets/images/products/categories/backpack.png",
            },
            {
              title: "Crossbody Bags",
              href: "/product/search/Crossbody Bags",
              imgUrl: "/assets/images/products/categories/bag.png",
            },
            {
              title: "Side Bags",
              href: "/product/search/Side Bags",
              imgUrl: "/assets/images/products/categories/mini-bag.png",
            },
            {
              title: "Slides",
              href: "/product/search/Slides",
              imgUrl: "/assets/images/products/categories/belt.png",
            },
          ],
        },
        {
          title: "Woman Clothes",
          href: "/product/search/woman-clothes",
          subCategories: [
            {
              title: "Shirt",
              href: "/product/search/shirt",
              imgUrl: "/assets/images/products/categories/shirt.png",
            },
            {
              title: "T- shirt",
              href: "/product/search/t-shirt",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
            {
              title: "Pant",
              href: "/product/search/pant",
              imgUrl: "/assets/images/products/categories/pant.png",
            },
            {
              title: "Underwear",
              href: "/product/search/underwear",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
          ],
        },
        {
          title: "Accessories",
          href: "/product/search/accessories",
          subCategories: [
            {
              title: "Belt",
              href: "/product/search/belt",
              imgUrl: "/assets/images/products/categories/belt.png",
            },
            {
              title: "Hat",
              href: "/product/search/Hat",
              imgUrl: "/assets/images/products/categories/hat.png",
            },
            {
              title: "Watches",
              href: "/product/search/Watches",
              imgUrl: "/assets/images/products/categories/watch.png",
            },
            {
              title: "Sunglasses",
              href: "/product/search/Sunglasses",
              imgUrl: "/assets/images/products/categories/sunglass.png",
            },
          ],
        },
        {
          title: "Shoes",
          href: "/product/search/shoes",
          subCategories: [
            {
              title: "Sneakers",
              href: "/product/search/Sneakers",
              imgUrl: "/assets/images/products/categories/sneaker.png",
            },
            {
              title: "Sandals",
              href: "/product/search/Sandals",
              imgUrl: "/assets/images/products/categories/sandal.png",
            },
            {
              title: "Formal",
              href: "/product/search/Formal",
              imgUrl: "/assets/images/products/categories/shirt.png",
            },
            {
              title: "Casual",
              href: "/product/search/Casual",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
          ],
        },
        {
          title: "Bags",
          href: "/product/search/bags",
          subCategories: [
            {
              title: "Backpack",
              href: "/product/search/backpack",
              imgUrl: "/assets/images/products/categories/backpack.png",
            },
            {
              title: "Crossbody Bags",
              href: "/product/search/Crossbody Bags",
              imgUrl: "/assets/images/products/categories/bag.png",
            },
            {
              title: "Side Bags",
              href: "/product/search/Side Bags",
              imgUrl: "/assets/images/products/categories/mini-bag.png",
            },
            {
              title: "Slides",
              href: "/product/search/Slides",
              imgUrl: "/assets/images/products/categories/belt.png",
            },
          ],
        },
      ],
      bottomImage: {
        imgUrl: "/assets/images/promotion/offer-5.png",
        href: "/",
      },
    },
  },
  {
    icon: "_gpu-card",
    title: "การ์ดจอ",
    href: "/product/search/bikes",
    menuComponent: "MegaMenu2",
    menuData: [
      {
        icon: "_gpu-card",
        title: "AMD",
        href: "/product/search/fashion",
        megaMenu: "MegaMenu1",
        menuData: {
          categories: [
            {
              title: "Man Clothes",
              href: "/product/search/man-clothes",
              subCategories: [
                {
                  title: "Shirt",
                  href: "/product/search/shirt",
                  imgUrl: "/assets/images/products/categories/shirt.png",
                },
                {
                  title: "T- shirt",
                  href: "/product/search/t-shirt",
                  imgUrl: "/assets/images/products/categories/t-shirt.png",
                },
                {
                  title: "Pant",
                  href: "/product/search/pant",
                  imgUrl: "/assets/images/products/categories/pant.png",
                },
                {
                  title: "Underwear",
                  href: "/product/search/underwear",
                  imgUrl: "/assets/images/products/categories/t-shirt.png",
                },
              ],
            },
            {
              title: "Accessories",
              href: "/product/search/accessories",
              subCategories: [
                {
                  title: "Belt",
                  href: "/product/search/belt",
                  imgUrl: "/assets/images/products/categories/belt.png",
                },
                {
                  title: "Hat",
                  href: "/product/search/Hat",
                  imgUrl: "/assets/images/products/categories/hat.png",
                },
                {
                  title: "Watches",
                  href: "/product/search/Watches",
                  imgUrl: "/assets/images/products/categories/watch.png",
                },
                {
                  title: "Sunglasses",
                  href: "/product/search/Sunglasses",
                  imgUrl: "/assets/images/products/categories/sunglass.png",
                },
              ],
            },
            {
              title: "Shoes",
              href: "/product/search/shoes",
              subCategories: [
                {
                  title: "Sneakers",
                  href: "/product/search/Sneakers",
                  imgUrl: "/assets/images/products/categories/sneaker.png",
                },
                {
                  title: "Sandals",
                  href: "/product/search/Sandals",
                  imgUrl: "/assets/images/products/categories/sandal.png",
                },
                {
                  title: "Formal",
                  href: "/product/search/Formal",
                  imgUrl: "/assets/images/products/categories/shirt.png",
                },
                {
                  title: "Casual",
                  href: "/product/search/Casual",
                  imgUrl: "/assets/images/products/categories/t-shirt.png",
                },
              ],
            },
            {
              title: "Bags",
              href: "/product/search/bags",
              subCategories: [
                {
                  title: "Backpack",
                  href: "/product/search/backpack",
                  imgUrl: "/assets/images/products/categories/backpack.png",
                },
                {
                  title: "Crossbody Bags",
                  href: "/product/search/Crossbody Bags",
                  imgUrl: "/assets/images/products/categories/bag.png",
                },
                {
                  title: "Side Bags",
                  href: "/product/search/Side Bags",
                  imgUrl: "/assets/images/products/categories/mini-bag.png",
                },
                {
                  title: "Slides",
                  href: "/product/search/Slides",
                  imgUrl: "/assets/images/products/categories/belt.png",
                },
              ],
            },
          ],
        },
      },
      {
        icon: "_gpu-card",
        title: "NVidia",
        href: "/product/search/electronics",
        megaMenu: 2,
      },
      {
        icon: "_gpu-card",
        title: "Intel",
        href: "/product/search/home&garden",
        megaMenu: 3,
      },
      // {
      //   icon: "baby-girl",
      //   title: "Baby Girl",
      //   href: "/product/search/bikes",
      //   megaMenu: "MegaMenu1",
      // },
    ],
  },
  {
    icon: "_memory",
    title: "แรม",
    href: "/product/search/home&garden",
    menuComponent: "MegaMenu1",
    menuData: {
      categories: [
        {
          title: "Man Clothes",
          href: "/product/search/man-clothes",
          subCategories: [
            {
              title: "Shirt",
              href: "/product/search/shirt",
              imgUrl: "/assets/images/products/categories/shirt.png",
            },
            {
              title: "T- shirt",
              href: "/product/search/t-shirt",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
            {
              title: "Pant",
              href: "/product/search/pant",
              imgUrl: "/assets/images/products/categories/pant.png",
            },
            {
              title: "Underwear",
              href: "/product/search/underwear",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
          ],
        },
        {
          title: "Accessories",
          href: "/product/search/accessories",
          subCategories: [
            {
              title: "Belt",
              href: "/product/search/belt",
              imgUrl: "/assets/images/products/categories/belt.png",
            },
            {
              title: "Hat",
              href: "/product/search/Hat",
              imgUrl: "/assets/images/products/categories/hat.png",
            },
            {
              title: "Watches",
              href: "/product/search/Watches",
              imgUrl: "/assets/images/products/categories/watch.png",
            },
            {
              title: "Sunglasses",
              href: "/product/search/Sunglasses",
              imgUrl: "/assets/images/products/categories/sunglass.png",
            },
          ],
        },
        {
          title: "Shoes",
          href: "/product/search/shoes",
          subCategories: [
            {
              title: "Sneakers",
              href: "/product/search/Sneakers",
              imgUrl: "/assets/images/products/categories/sneaker.png",
            },
            {
              title: "Sandals",
              href: "/product/search/Sandals",
              imgUrl: "/assets/images/products/categories/sandal.png",
            },
            {
              title: "Formal",
              href: "/product/search/Formal",
              imgUrl: "/assets/images/products/categories/shirt.png",
            },
            {
              title: "Casual",
              href: "/product/search/Casual",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
          ],
        },
        {
          title: "Bags",
          href: "/product/search/bags",
          subCategories: [
            {
              title: "Backpack",
              href: "/product/search/backpack",
              imgUrl: "/assets/images/products/categories/backpack.png",
            },
            {
              title: "Crossbody Bags",
              href: "/product/search/Crossbody Bags",
              imgUrl: "/assets/images/products/categories/bag.png",
            },
            {
              title: "Side Bags",
              href: "/product/search/Side Bags",
              imgUrl: "/assets/images/products/categories/mini-bag.png",
            },
            {
              title: "Slides",
              href: "/product/search/Slides",
              imgUrl: "/assets/images/products/categories/belt.png",
            },
          ],
        },
        {
          title: "Woman Clothes",
          href: "/product/search/woman-clothes",
          subCategories: [
            {
              title: "Shirt",
              href: "/product/search/shirt",
              imgUrl: "/assets/images/products/categories/shirt.png",
            },
            {
              title: "T- shirt",
              href: "/product/search/t-shirt",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
            {
              title: "Pant",
              href: "/product/search/pant",
              imgUrl: "/assets/images/products/categories/pant.png",
            },
            {
              title: "Underwear",
              href: "/product/search/underwear",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
          ],
        },
        {
          title: "Accessories",
          href: "/product/search/accessories",
          subCategories: [
            {
              title: "Belt",
              href: "/product/search/belt",
              imgUrl: "/assets/images/products/categories/belt.png",
            },
            {
              title: "Hat",
              href: "/product/search/Hat",
              imgUrl: "/assets/images/products/categories/hat.png",
            },
            {
              title: "Watches",
              href: "/product/search/Watches",
              imgUrl: "/assets/images/products/categories/watch.png",
            },
            {
              title: "Sunglasses",
              href: "/product/search/Sunglasses",
              imgUrl: "/assets/images/products/categories/sunglass.png",
            },
          ],
        },
        {
          title: "Shoes",
          href: "/product/search/shoes",
          subCategories: [
            {
              title: "Sneakers",
              href: "/product/search/Sneakers",
              imgUrl: "/assets/images/products/categories/sneaker.png",
            },
            {
              title: "Sandals",
              href: "/product/search/Sandals",
              imgUrl: "/assets/images/products/categories/sandal.png",
            },
            {
              title: "Formal",
              href: "/product/search/Formal",
              imgUrl: "/assets/images/products/categories/shirt.png",
            },
            {
              title: "Casual",
              href: "/product/search/Casual",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
          ],
        },
        {
          title: "Bags",
          href: "/product/search/bags",
          subCategories: [
            {
              title: "Backpack",
              href: "/product/search/backpack",
              imgUrl: "/assets/images/products/categories/backpack.png",
            },
            {
              title: "Crossbody Bags",
              href: "/product/search/Crossbody Bags",
              imgUrl: "/assets/images/products/categories/bag.png",
            },
            {
              title: "Side Bags",
              href: "/product/search/Side Bags",
              imgUrl: "/assets/images/products/categories/mini-bag.png",
            },
            {
              title: "Slides",
              href: "/product/search/Slides",
              imgUrl: "/assets/images/products/categories/belt.png",
            },
          ],
        },
      ],
    },
  },
  {
    icon: "device-hdd",
    title: "ฮาร์ดไดร์ฟ",
    href: "/product/search/gifts",
    menuComponent: "MegaMenu2",
    menuData: [
      {
        icon: "device-hdd",
        title: "ฮาร์ดิสก์",
        href: "/product/search/fashion",
      },
      {
        icon: "device-hdd",
        title: "เอสเอสดี",
        href: "/product/search/electronics",
      },
      {
        icon: "device-hdd",
        title: "การ์ด M.2",
        href: "/product/search/home&garden",
      },
    ],
  },
  {
    icon: "_safe2",
    title: "พาวเวอร์ซัพพลาย",
    href: "/product/search/music",
    menuComponent: "MegaMenu1",
  },
  {
    icon: "_fan",
    title: "ชุดระบายความร้อน",
    href: "/product/search/automotive",
    menuComponent: "MegaMenu1",
  },
  {
    icon: "_laptop",
    title: "โน๊ตบุ๊ก",
    href: "/product/search/health&beauty",
    menuComponent: "MegaMenu1",
  },
  {
    icon: "mouse2",
    title: "เมาส์",
    href: "/product/search/pets",
    menuComponent: "MegaMenu1",
  },
  {
    icon: "_keyboard",
    title: "คีย์บอร์ด",
    href: "/product/search/baby-toys",
    menuComponent: "MegaMenu1",
  },
  {
    icon: "_display",
    title: "จอ คอมพิวเตอร์",
    href: "/product/search/groceries",
    menuComponent: "MegaMenu1",
  },
  {
    icon: "plugin",
    title: "อุปกรณ์เสริม",
    href: "/product/search/automotive",
    menuComponent: "MegaMenu1",
  },
];

export default navigations;
