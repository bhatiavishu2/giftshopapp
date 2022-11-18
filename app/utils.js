export const Permissions = {
    EDIT_CATEGORY: 'EDIT_CATEGORY',
    DELETE_CATEGORY: 'DELETE_CATEGORY',
    CREATE_CATEGORY: 'CREATE_CATEGORY',
    EDIT_PRODUCT: 'EDIT_PRODUCT',
    DELETE_PRODUCT: 'DELETE_PRODUCT',
    CREATE_PRODUCT: 'CREATE_PRODUCT',
    CREATE_PERMISSION: 'CREATE_PERMISSION',
    CREATE_ROLE: 'CREATE_ROLE',
    CREATE_USER_ROLE: 'CREATE_USER_ROLE',
    RESELLER: 'RESELLER',
    SHOPKEEPER: 'SHOPKEEPER',
    CREATE_BANNER: 'CREATE_BANNER',
    CREATE_CONTACT_US: 'CREATE_CONTACT_US',
    CREATE_ABOUT_US: 'CREATE_ABOUT_US',
    DELETE_USER: 'DELETE_USER',
}
const hasPermission = (allPermissions, requiredPermissions) => {
    return (
        !requiredPermissions ||
        (allPermissions || []).some((prmsn) =>
            requiredPermissions.includes(prmsn),
        )
    )
}
export const withPermissions = (permissions, cb) => (obj, args, user, info) => {
    if (!user.permissions || !hasPermission(user.permissions, permissions)) {
        return new Error('Unauthorized')
    }
    return cb(obj, args, user, info)
}
