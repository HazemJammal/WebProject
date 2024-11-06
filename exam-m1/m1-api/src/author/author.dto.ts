export class CreateAuthorDto {
    firstname: string;
    lastname: string;
    photo: string;
    biography: string;
  }

  export class UpdateAuthorDto {
    firstname?: string;
    lastname?: string;
    photo?: string;
    biography?: string;
  }

  