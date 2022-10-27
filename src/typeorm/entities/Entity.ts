import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  //email로 회원가입을 해야하니까 우선 unique하게 하고, passport-google을 확인해보기
  @Column({ unique: true })
  email: string;

  @Column()
  nickname: string;

  @Column()
  password: string;
  //소셜로그인 기능을 구현한다면 있으면 좋을 듯
  @Column({ nullable: true })
  authStrategy: string;

  @Column()
  createdAt: Date;
}
