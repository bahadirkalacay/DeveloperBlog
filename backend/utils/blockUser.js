const blockUser = user => {
    if(user?.isBlocked){
        throw new Error (`aAccess Denied ${user?.firstName} is blocked`)
    }
}

module.exports = blockUser;