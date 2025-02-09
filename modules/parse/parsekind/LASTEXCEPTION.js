/* eslint-disable max-len */
/* eslint-disable sonarjs/no-duplicate-string */
const {
    EmbedBuilder,
} = require('discord.js');

exports.execute = async (client, attachmentName, data) => {
    // handle the injection error blob
    const timestamp = Math.round(Date.parse(data?.When) / 1000);

    const replymessage3 = new EmbedBuilder()
        .setTitle(`${attachmentName} LASTEXCEPTION parse results${client.configdb.get("DEBUGMODE") ? " - Debug Version" : ""}`)
        .setDescription("Franzbot has parsed your log file. "
            + "Here's some information about the last issue found in your log file.")
        .setColor(13580863)
        .setFooter({
            text: client.configdb.get("FRANZBOT_VERSION"),
        });

    const exceptionInfo = data?.Info;
    const exceptionContext = data?.Context;

    if (exceptionInfo.length > 0) {
        // console.log(`Long Info ${exceptionInfo.length} characters.`);
        if (exceptionInfo.length > 1024) {
            const temp = exceptionInfo.split("\r\n");
            // console.log(temp);
            // console.log(`Split into ${temp.length} lines`);
            let tempvalue = "";
            let overflowed = false;

            temp.forEach(line => {
                tempvalue += line;
                if (tempvalue.length > 700) {
                    // console.log("Splitting Info into new field.");
                    replymessage3.addFields(
                        {
                            name: "Info",
                            value: `\`\`\`${tempvalue}\`\`\``,
                        }
                    );
                    tempvalue = "";
                    overflowed = true;
                }
            });

            if (overflowed) {
                replymessage3.addFields(
                    {
                        name: "Info continued",
                        value: `\`\`\`${tempvalue}\`\`\``,
                    }
                );
            }
        }
        else {
            replymessage3.addFields(
                {
                    name: "Info",
                    value: `\`\`\`${data?.Info}\`\`\``,
                }
            );
        }
    }

    if (exceptionContext.length > 0) {
        // console.log(`Long Context ${exceptionInfo.length} characters.`);
        if (exceptionContext.length > 1024) {
            const temp = exceptionContext.split("\r\n");
            // console.log(`Split into ${temp.length} lines`);
            let tempvalue = "";
            let overflowed = false;

            temp.forEach(line => {
                tempvalue += line;
                if (tempvalue.length > 700) {
                    // console.log("Splitting Context into new field.");
                    replymessage3.addFields(
                        {
                            name: "Context",
                            value: `\`\`\`${tempvalue}\`\`\``,
                        }
                    );
                    tempvalue = "";
                    overflowed = true;
                }
            });

            if (overflowed) {
                replymessage3.addFields(
                    {
                        name: "Context continued",
                        value: `\`\`\`${tempvalue}\`\`\``,
                    }
                );
            }
        }
        else {
            replymessage3.addFields(
                {
                    name: "Context",
                    value: `\`\`\`${data?.Context}\`\`\``,
                }
            );
        }
    }

    replymessage3.addFields(
        {
            name: "Timestamp",
            value: `${data?.When}\n<t:${timestamp}:F>`,
        }
    );

    return [replymessage3];
}