import { v4 } from 'uuid';

// 메뉴 목록
const initialMenuList = [
  '부대찌개집 송탄',
  '부대찌개집 지하?',
  '유타로',
  '멀리있는 왕돈까스집',
  '하나우동',
  '밥심',
  '맥날',
  '칸나칼국수',
  '이조 불쭈꾸미?',
  'KFC',
  '백반',
  '혜정식당',
  '옛터',
  '꾸아',
  '만다린',
  '참',
  '투가리',
  '이름모를 닭갈비집',
  '오토 김밥',
  '봇밥',
  // '스테이크 샌드위치',
];

// 메뉴 객체 배열 생성
export const initialMenus = initialMenuList.map((option) => ({
  option,
  id: v4(),
}));
