import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
// similar to passport.authenticate('local')
// so it has to be 'local' as specified in passport local strategy;
