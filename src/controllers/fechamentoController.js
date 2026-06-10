import PDFDocument from "pdfkit";

import fechamentoService from "../services/fechamentoService.js";

async function index(request, response, next) {
    try {
        const closings =
            await fechamentoService.listClosings();

        return response.status(200).json({
            success: true,
            data: closings,
        });
    } catch (error) {
        next(error);
    }
}

async function show(request, response, next) {
    try {
        const { id } = request.params;

        const closing =
            await fechamentoService.getClosingById(id);

        return response.status(200).json({
            success: true,
            data: closing,
        });
    } catch (error) {
        next(error);
    }
}

async function generate(request, response, next) {
    try {
        const { id_usuario } = request.user;

        const result =
            await fechamentoService.generateClosing(id_usuario);

        return response.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

// exporta fechamentos como CSV
async function exportCsv(request, response, next) {
    try {
        const closings = await fechamentoService.listClosings();

        const header =
            "id_fechamento,id_cliente,id_usuario,mes,ano,total_operacoes,total_quantidade,gerado_em";

        const rows = closings.map((c) =>
            [
                c.id_fechamento,
                c.id_cliente,
                c.id_usuario,
                c.mes,
                c.ano,
                c.total_operacoes,
                c.total_quantidade,
                c.gerado_em,
            ].join(","),
        );

        const csv = [header, ...rows].join("\n");

        response.setHeader("Content-Type", "text/csv");
        response.setHeader(
            "Content-Disposition",
            "attachment; filename=fechamentos.csv",
        );

        return response.send(csv);
    } catch (error) {
        next(error);
    }
}

// exporta fechamentos como PDF
async function exportPdf(request, response, next) {
    try {
        const closings = await fechamentoService.listClosings();

        const doc = new PDFDocument({ margin: 40 });

        response.setHeader("Content-Type", "application/pdf");
        response.setHeader(
            "Content-Disposition",
            "attachment; filename=fechamentos.pdf",
        );

        doc.pipe(response);

        doc.fontSize(16).text("Relatório de Fechamentos Mensais", {
            align: "center",
        });
        doc.moveDown();

        doc.fontSize(9).text(
            "ID  | Cliente | Usuário | Mês | Ano | Operações | Quantidade | Gerado em",
        );
        doc.moveDown();

        for (const c of closings) {
            doc.text(
                `${c.id_fechamento}  | ${c.id_cliente}  | ${c.id_usuario}  | ${c.mes}  | ${c.ano}  | ${c.total_operacoes}  | ${c.total_quantidade}  | ${c.gerado_em}`,
            );
        }

        doc.end();
    } catch (error) {
        next(error);
    }
}

export default {
    index,
    show,
    generate,
    exportCsv,
    exportPdf,
};