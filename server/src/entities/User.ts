import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import Base from './defaults/Base';

@ObjectType()
@Entity('users')
class User extends Base {
  @Field()
  @Column()
  fullName: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}

export default User;
