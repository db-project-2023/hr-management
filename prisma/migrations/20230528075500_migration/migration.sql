-- CreateTable
CREATE TABLE `address` (
    `employeeId` INTEGER NOT NULL,
    `houseNumber` TEXT NOT NULL,
    `street` TEXT NOT NULL,
    `province` TEXT NOT NULL,
    `zipcode` TEXT NOT NULL,

    INDEX `employeeIdFK_reviewer`(`employeeId`),
    PRIMARY KEY (`employeeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `candidate` (
    `candidateId` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(50) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `previousSalary` INTEGER NULL,
    `expectedSalary` INTEGER NOT NULL,
    `candidateStatus` VARCHAR(10) NOT NULL,
    `email` TEXT NOT NULL,
    `telephoneNumber` VARCHAR(10) NOT NULL,
    `positionId` INTEGER NOT NULL,

    UNIQUE INDEX `firstNameINDEX_candidate`(`firstName`),
    UNIQUE INDEX `lastNameINDEX_candidate`(`lastName`),
    UNIQUE INDEX `telephoneNumberINDEX_candidate`(`telephoneNumber`),
    INDEX `positionIdFK_candidate`(`positionId`),
    PRIMARY KEY (`candidateId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `department` (
    `departmentId` INTEGER NOT NULL AUTO_INCREMENT,
    `departmentName` TEXT NOT NULL,

    PRIMARY KEY (`departmentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee` (
    `employeeId` INTEGER NOT NULL AUTO_INCREMENT,
    `candidateId` INTEGER NOT NULL,
    `firstName` VARCHAR(50) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `salary` INTEGER NOT NULL,
    `startDate` DATETIME(0) NOT NULL,
    `positionId` INTEGER NOT NULL,
    `telephoneNumber` VARCHAR(10) NOT NULL,
    `departmentId` INTEGER NOT NULL,
    `photo` BLOB NOT NULL,
    `email` TEXT NOT NULL,

    INDEX `candidateIdFK_employee`(`candidateId`),
    INDEX `departmentIdFK_employee`(`departmentId`),
    INDEX `firstNameFK_employee`(`firstName`),
    INDEX `lastNameFK_employee`(`lastName`),
    INDEX `positionIdFK_employee`(`positionId`),
    INDEX `telephoneNumberFK_employee`(`telephoneNumber`),
    PRIMARY KEY (`employeeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `interview` (
    `interviewId` INTEGER NOT NULL AUTO_INCREMENT,
    `candidateId` INTEGER NOT NULL,
    `interviewDate` DATETIME(0) NOT NULL,
    `status` VARCHAR(10) NOT NULL,

    INDEX `candidateIdFK_interview`(`candidateId`),
    PRIMARY KEY (`interviewId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `interviewer` (
    `interviewId` INTEGER NOT NULL,
    `employeeId` INTEGER NOT NULL,
    `status` VARCHAR(10) NOT NULL,
    `comments` TEXT NOT NULL,

    INDEX `employeeIdFK_interviewer`(`employeeId`),
    PRIMARY KEY (`interviewId`, `employeeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `leave` (
    `year` YEAR NOT NULL,
    `employeeId` INTEGER NOT NULL,
    `leaveType` VARCHAR(10) NOT NULL,
    `days` INTEGER NOT NULL,

    INDEX `employeeIdFK_leave`(`employeeId`),
    PRIMARY KEY (`year`, `employeeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `leave_request` (
    `leaveRequestId` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeId` INTEGER NOT NULL,
    `leaveType` VARCHAR(10) NOT NULL,
    `startDate` DATETIME(0) NOT NULL,
    `endDate` DATETIME(0) NOT NULL,
    `leaveFile` BLOB NOT NULL,
    `status` VARCHAR(10) NOT NULL,

    INDEX `employeeIdFK_leave_request`(`employeeId`),
    PRIMARY KEY (`leaveRequestId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `position` (
    `positionId` INTEGER NOT NULL AUTO_INCREMENT,
    `departmentId` INTEGER NOT NULL,
    `status` VARCHAR(10) NOT NULL,
    `noOfRequiredEmployee` INTEGER NOT NULL,
    `salaryRangeHigh` INTEGER NOT NULL,
    `salaryRangeLow` INTEGER NOT NULL,
    `positionDescription` TEXT NOT NULL,

    INDEX `departmentIdFK_position`(`departmentId`),
    PRIMARY KEY (`positionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `position_skill` (
    `skillName` VARCHAR(20) NOT NULL,
    `positionId` INTEGER NOT NULL,

    INDEX `positionIdFK`(`positionId`),
    PRIMARY KEY (`skillName`, `positionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resume` (
    `resumeId` INTEGER NOT NULL AUTO_INCREMENT,
    `candidateId` INTEGER NOT NULL,
    `resume` BLOB NOT NULL,

    INDEX `candidateIdFK_resume`(`candidateId`),
    PRIMARY KEY (`resumeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviewer` (
    `candidateId` INTEGER NOT NULL,
    `employeeId` INTEGER NOT NULL,
    `status` VARCHAR(10) NOT NULL,
    `comments` TEXT NOT NULL,

    INDEX `candidateIdFK_reviewer`(`candidateId`),
    INDEX `employeeIdFK_reviewer`(`employeeId`),
    PRIMARY KEY (`candidateId`, `employeeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `score` (
    `interviewId` INTEGER NOT NULL,
    `employeeId` INTEGER NOT NULL,
    `skillName` VARCHAR(20) NOT NULL,
    `score` INTEGER NOT NULL,

    INDEX `employeeIdFK_score`(`employeeId`),
    INDEX `skillNameFK_score`(`skillName`),
    PRIMARY KEY (`interviewId`, `employeeId`, `skillName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skill` (
    `skillName` VARCHAR(20) NOT NULL,
    `skillDescription` TEXT NOT NULL,
    `type` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`skillName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `employeeIdFK_address` FOREIGN KEY (`employeeId`) REFERENCES `employee`(`employeeId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `candidate` ADD CONSTRAINT `positionIdFK_candidate` FOREIGN KEY (`positionId`) REFERENCES `position`(`positionId`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `candidateIdFK_employee` FOREIGN KEY (`candidateId`) REFERENCES `candidate`(`candidateId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `departmentIdFK_employee` FOREIGN KEY (`departmentId`) REFERENCES `department`(`departmentId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `firstNameFK_employee` FOREIGN KEY (`firstName`) REFERENCES `candidate`(`firstName`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `lastNameFK_employee` FOREIGN KEY (`lastName`) REFERENCES `candidate`(`lastName`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `positionIdFK_employee` FOREIGN KEY (`positionId`) REFERENCES `position`(`positionId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `telephoneNumberFK_employee` FOREIGN KEY (`telephoneNumber`) REFERENCES `candidate`(`telephoneNumber`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `interview` ADD CONSTRAINT `candidateIdFK_interview` FOREIGN KEY (`candidateId`) REFERENCES `candidate`(`candidateId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `interviewer` ADD CONSTRAINT `employeeIdFK_interviewer` FOREIGN KEY (`employeeId`) REFERENCES `employee`(`employeeId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `interviewer` ADD CONSTRAINT `interviewIdFK_interviewer` FOREIGN KEY (`interviewId`) REFERENCES `interview`(`interviewId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leave` ADD CONSTRAINT `employeeIdFK_leave` FOREIGN KEY (`employeeId`) REFERENCES `employee`(`employeeId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leave_request` ADD CONSTRAINT `employeeIdFK_leave_request` FOREIGN KEY (`employeeId`) REFERENCES `employee`(`employeeId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `position` ADD CONSTRAINT `departmentIdFK_position` FOREIGN KEY (`departmentId`) REFERENCES `department`(`departmentId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `position_skill` ADD CONSTRAINT `positionIdFK` FOREIGN KEY (`positionId`) REFERENCES `position`(`positionId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `position_skill` ADD CONSTRAINT `skillNameFK` FOREIGN KEY (`skillName`) REFERENCES `skill`(`skillName`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resume` ADD CONSTRAINT `candidateIdFK_resume` FOREIGN KEY (`candidateId`) REFERENCES `candidate`(`candidateId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviewer` ADD CONSTRAINT `candidateIdFK_reviewer` FOREIGN KEY (`candidateId`) REFERENCES `candidate`(`candidateId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviewer` ADD CONSTRAINT `employeeIdFK_reviewer` FOREIGN KEY (`employeeId`) REFERENCES `employee`(`employeeId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `score` ADD CONSTRAINT `employeeIdFK_score` FOREIGN KEY (`employeeId`) REFERENCES `employee`(`employeeId`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `score` ADD CONSTRAINT `interviewIdFK_score` FOREIGN KEY (`interviewId`) REFERENCES `interview`(`interviewId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `score` ADD CONSTRAINT `skillNameFK_score` FOREIGN KEY (`skillName`) REFERENCES `skill`(`skillName`) ON DELETE RESTRICT ON UPDATE RESTRICT;
