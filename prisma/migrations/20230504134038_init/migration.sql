-- CreateTable
CREATE TABLE `test_table` (
    `test_id` INTEGER NOT NULL AUTO_INCREMENT,
    `attr1` TEXT NOT NULL,
    `attr2` TEXT NOT NULL,
    `attr3` INTEGER NOT NULL,

    PRIMARY KEY (`test_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
