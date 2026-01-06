import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  headline: string;
  description: string;
  points: string[];
  image: string;
  imageAlt: string;
  align: 'left' | 'right';
}

export interface ValueProp {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface FAQItem {
  question: string;
  answer: string;
}