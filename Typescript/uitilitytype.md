# Utility types

-   Partial: 특정 타입의 부분집합을 만족하는 타입을 정의
-   Pick: 특정 타입에서 몇 개의 속성을 선택하여 타입을 정의
-   Omit: 특정 속성만 제거한 타입을 정의

## Partial

```ts
interface Profile {
  id: string;
  name: string;
  regNumber: string;
  email: string;
  address: string;
  phone: string;
}

const profileA: Partial<Profile> = {};
const profileB: Partial<Profile> = { id: '1' };
const profileC: Partial<Profile> = { id: '1', name: 'sungmin jo' };

// ProfileB는 Partial<Profile>과 동일하다. ProfileB = Partial<Profile>
// 그러나 같은 인터페이스를 정의하는 것을 피하기 위해 Partial을 사용한다.
interface ProfileB {
  id?: string;
  name?: string;
  regNumber?: string;
  email?: string;
  address?: string;
  phone?: string;
}
```

## Pick

```ts
interface Profile {
  id: string;
  name: string;
  regNumber: string;
  email: string;
  address: string;
  phone: string;
}

const profileA: Pick<Profile, 'id'> = { id: '1' };
const profileB: Pick<Profile, 'id' | 'name'> = { id: '1', name: 'sungmin jo' };
const profileC: Pick<Profile, 'id' | 'name' | 'regNumber'> = {
  id: '1',
  name: 'sungmin jo',
  regNumber: '123456789',
};
```

## Omit

```ts
interface Profile {
  id: string;
  name: string;
  regNumber: string;
  email: string;
  address: string;
  phone: string;
}

const profileA: Omit<Profile, 'address' | 'phone'> = {
  id: '1',
  name: 'sungmin jo',
  regNumber: '123456789',
  email: 'tjdals6695@gmail.com',
};
const profileB: Omit<Profile, 'email' | 'address' | 'phone'> = {   
  id: '1',
  name: 'sungmin jo',
  regNumber: '123456789'
};
const profileC: Omit<Profile, 'regNumber' | 'email' | 'address' | 'phone'> = {
  id: '1',
  name: 'sungmin jo',
};
```