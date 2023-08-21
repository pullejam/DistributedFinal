const apiDoc = {
    openapi: "3.0.1",
    info: {
        title: "Chat-Ware",
        description: "Allows users to make friends, and have fun through messaging",
        version: "1.0.0"
    },
    paths: {},
    components: {
        parameters: {
            messagesId: {
                name: "messageId",
                in: "path",
                required: true,
                schema: {
                    $ref: "#/components/schemas/messageId"
                }

            },
            usersId: {
                name: "userId",
                in: "path",
                required: true,
                schema: {
                    $ref: "#/components/schemas/userId"
                }

            },
            groupsId: {
                name: "groupId",
                in: "path",
                required: true,
                schema: {
                    $ref: "#/components/schemas/groupId"
                }
            },
            invitesId: {
                name: "inviteId",
                in: "path",
                required: true,
                schema: {
                    $ref: "#/components/schemas/inviteId"
                }
            }


        },
        schemas: {
            messageId: {
                type: "integer"
            },
            userId: {
                type: "integer"
            },
            groupId: {
                type: "integer"
            },
            inviteId: {
                type: "integer"
            },

            message: {
                type: "object",
                properties: {
                    messageId: {
                        $ref: "#/components/schemas/messageId"
                    },
                    message: {
                        type: "string"
                    },
                    timeStamp: {
                        type: "string"
                    },
                    groupId: {
                        $ref: "#/components/schemas/groupId"
                    },
                    userToId: {
                        $ref: "#/components/schemas/userId"
                    },
                    userFromId: {
                        $ref: "#/components/schemas/userId"
                    }
                }
            },
            user: {
                type: "object",
                properties: {
                    name: {
                        type: "string"
                    },
                    Email: {
                        type: "string"
                    },
                    Password: {
                        type: "string"
                    },
                    id: {
                        $ref: "#/components/schemas/userId"
                    },
                    groupIds: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/userId"
                        }

                    },


                }
            },
            invite: {
                type: "object",
                properties: {
                    id: {
                        $ref: "#/components/schemas/offerId"
                    },
                    userToId: {
                        $ref: "#/components/schemas/userId"

                    },
                    userFromId: {
                        $ref: "#/components/schemas/userId"

                    },
                    groupId: {
                        $ref: "#/components/schemas/gameId"

                    },
                    status: {
                        type: "string"
                    }

                }
            },
            groupChat: {
                type: "object",
                properties: {
                    id: {
                        $ref: "#/components/schemas/groupId"
                    },
                    creatorId: {
                        $ref: "#/components/schemas/userId"

                    },
                    groupMembersIds: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/userId"
                        }
                    },
                    name: {
                        type: "string"
                    },
                    messageIds: {
                        $ref: "#/components/schemas/messageId"
                    }

                }
            }
        }
    }


}

module.exports = apiDoc;