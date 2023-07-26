export default class Helper {
  static transformUserForFetch(data) {
    return {
      email: data.email,
      password: data?.password || null,
      is_active: true,
      is_superuser: data?.is_superuser || false,
      is_verified: false,
      external: {
        avatar: data.avatar,
        firstName: data.firstName,
        lastName: data.lastName,
        categories: data.categories,
        description: data?.description || "",
      },
    };
  }

  static transformUserForUsage(data) {
    return {
      id: data.id,
      email: data.email,
      // is_active: true,
      // is_superuser: data.is_superuser,
      is_verified: false,
      avatar: data.external.avatar,
      firstName: data.external.firstName,
      lastName: data.external.lastName,
      categories: data?.external?.categories || [],
      description: data?.external.description || "",
    };
  }
}
