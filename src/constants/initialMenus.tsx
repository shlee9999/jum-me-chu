import { v4 } from 'uuid';

// 메뉴 목록
const initialMenuList = [
  '송탄',
  '유타로',
  '하나우동',
  '맥날',
  '칸나칼국수',
  '이조 불쭈꾸미',
  'KFC',
  '혜정식당',
  '옛터',
  '꾸아',
  '만다린',
  '참',
  '투가리',
  '이름모를 닭갈비집',
  '오토 김밥',
  '봇밥',
  '백소정',
  '십원집',
];

// 메뉴 객체 배열 생성
export const initialMenus = initialMenuList.map((option) => ({
  option,
  id: v4(),
}));
