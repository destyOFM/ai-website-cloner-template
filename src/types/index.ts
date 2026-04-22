export interface Product {
  title: string;
  price: string;
  imgSrc: string;
  imgAlt?: string;
  link: string;
  secondaryImgSrc?: string;
}

export interface CollectionBannerItem {
  title: string;
  imgSrc: string;
  imgAlt?: string;
  link: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}
